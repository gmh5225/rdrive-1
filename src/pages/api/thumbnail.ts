import type { OdThumbnail } from '../../types'

import { posix as pathPosix } from 'path'

import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import { checkAuthRoute, encodePath, getAccessTokens } from '.'
import apiConfig from '../../config/api.config'
import { readOdConcealedAccessTokens } from '../../utils/odAuthTokenStore'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const isPostRequest = /post/i.test(req.method as string);

  let accessTokens = isPostRequest ? 
      readOdConcealedAccessTokens(req.body.connectedAccounts as string) : 
      await getAccessTokens();  
  
  if (!accessTokens.length) {
    res.status(403).json({ error: 'No access token.' })
    return
  }

  // Get item thumbnails by its path since we will later check if it is protected
  const { path = '', size = 'large', odpt = '' } = req.query

  // Set edge function caching for faster load times, if route is not protected, check docs:
  // https://vercel.com/docs/concepts/functions/edge-caching
  if (odpt === '') res.setHeader('Cache-Control', apiConfig.cacheControlHeader)

  // Check whether the size is valid - must be one of 'large', 'medium', or 'small'
  if (size !== 'large' && size !== 'medium' && size !== 'small') {
    res.status(400).json({ error: 'Invalid size' })
    return
  }
  // Sometimes the path parameter is defaulted to '[...path]' which we need to handle
  if (path === '[...path]') {
    res.status(400).json({ error: 'No path specified.' })
    return
  }
  // If the path is not a valid path, return 400
  if (typeof path !== 'string') {
    res.status(400).json({ error: 'Path query invalid.' })
    return
  }
  const cleanPath = pathPosix.resolve('/', pathPosix.normalize(path))

  await Promise.all(accessTokens.map(accessToken => {
    // Status code other than 200 means user has not authenticated yet
    return checkAuthRoute(cleanPath, accessToken, odpt as string)
  })).then(responses => {
    responses.map(({ code, message }) => {
      // If message is empty, then the path is not protected.
      // Conversely, protected routes are not allowed to serve from cache.
      if (message !== '') {
        res.setHeader('Cache-Control', 'no-cache')
      }
    })
  })
  
  const requestPath = encodePath(cleanPath)
  // Handle response from OneDrive API
  const requestUrl = `${apiConfig.driveApi}/root${requestPath}`
  // Whether path is root, which requires some special treatment
  const isRoot = requestPath === ''

  // search for thumbnail across multiple OneDrive accounts (one for each access token)
  return await Promise.all(accessTokens.map(accessToken => {
    return axios.get(`${requestUrl}${isRoot ? '' : ':'}/thumbnails`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then(({ data }) => {
      const thumbnailUrl = data.value && data.value.length > 0 ? (data.value[0] as OdThumbnail)[size].url : null
      if (thumbnailUrl) {
        return thumbnailUrl
      } else {
        return null
      }
      /* some files do not have a thumbnail */
    }).catch(err => { return null })
  }))
  .then(results => results.filter(result => result != null))
  .then((results) => {
    if(!results.length){
      return null;
    } else {
      if(results.length > 1){
        console.warn(`duplicate thumbnails found: ${results}`)
      }
      return results[0]
    }
  }).then(thumbnailUrl => {
    if(thumbnailUrl){
      return /get/i.test(req.method as string) ? res.redirect(thumbnailUrl as string) : res.json(thumbnailUrl);
    } else {
      return res.status(404) // 404 not found
                .json({ error: "The item doesn't have a valid thumbnail." })
    }
  }).catch(error => { 
    return res.status(error?.response?.status ?? 500).json({ error: error?.response?.data ?? 'Internal server error.' })
   });
}
