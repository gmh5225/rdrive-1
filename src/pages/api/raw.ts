import { posix as pathPosix } from 'path'

import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosResponseHeaders } from 'axios'
import Cors from 'cors'

import { driveApi, cacheControlHeader } from '../../config/api.config'
import { encodePath, getAccessTokens } from '.'


// CORS middleware for raw links: https://nextjs.org/docs/api-routes/api-middlewares
export function runCorsMiddleware(req: NextApiRequest, res: NextApiResponse) {
  const cors = Cors({ methods: ['GET', 'HEAD'] })
  return new Promise((resolve, reject) => {
    cors(req, res, result => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessTokens = await getAccessTokens()

  if (!accessTokens.length) {
    res.status(403).json({ error: 'No access token.' })
    return
  }

  const { path = '/', odpt = '', proxy = false } = req.query

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


  await runCorsMiddleware(req, res)

  // search for file across multiple OneDrive accounts (one per access token)
  const responses = await Promise.all(accessTokens.map(accessToken => {
    const requestUrl = `${driveApi}/root${encodePath(cleanPath)}`
    return axios.get(requestUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        // OneDrive international version fails when only selecting the downloadUrl (what a stupid bug)
        select: 'id,size,@microsoft.graph.downloadUrl',
      },
    }).catch(err => err) 
    // we expect failure because this code searches 
    // for a single file across multiple accounts.
    // (the file won't exist in every account)
  })).then(results => {
    // only collect successful responses (ignore any errors)
    return results.filter(result => result.status == 200) // 200 = OK
                  .map(result => result.data) // return file data from the successful result
  })

  if(responses.length == 0){
    return res.status(404).json({ error: 'No download url found try again.' })
  }

  if(responses.length > 1){
    console.warn('the same file was found across multiple OneDrive accounts: ', path)
  }

  const data = responses[0];

  if ('@microsoft.graph.downloadUrl' in data) {
    if (proxy && 'size' in data && data['size'] < 4194304) {
      return await axios.get(data['@microsoft.graph.downloadUrl'] as string, {
        responseType: 'stream',
      }).then(({ headers, data: stream }) => {
        headers['Cache-Control'] = cacheControlHeader
        // Send data stream as response
        res.writeHead(200, headers as AxiosResponseHeaders)
        stream.pipe(res)
        return
      }).catch(error => {
        return res.status(error?.response?.status ?? 500).json({ error: error?.response?.data ?? 'Internal server error.' })
      })
    } else {
      return res.redirect(data['@microsoft.graph.downloadUrl'])
    }
  } else {
    return res.status(404).json({ error: 'No download url found try again.' })
  }
}