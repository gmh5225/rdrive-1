import { posix as pathPosix } from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import apiConfig from '../../config/api.config'
import siteConfig from '../../config/site.config'
import { obfuscateToken, revealObfuscatedToken } from '../../utils/oAuthHandler'
import { compareHashedToken } from '../../utils/protectedRouteHandler'
import { getOdAccessTokens, readOdConcealedAccessTokens, storeOdAuthTokens } from '../../utils/odAuthTokenStore'
import { runCorsMiddleware } from './raw'
import { getOrigin } from '../../utils/getBaseUrl'

const basePath = pathPosix.resolve('/', siteConfig.baseDirectory)

/**
 * Encode the path of the file relative to the base directory
 *
 * @param path Relative path of the file to the base directory
 * @returns Absolute path of the file inside OneDrive
 */
export function encodePath(path: string): string {
  let encodedPath = pathPosix.join(basePath, path)
  if (encodedPath === '/' || encodedPath === '') {
    return ''
  }
  encodedPath = encodedPath.replace(/\/$/, '')
  return `:${encodeURIComponent(encodedPath)}`
}

/**
 * Fetch the access tokens from Redis storage
 *
 * @returns Access tokens for OneDrive API
 */
export async function getAccessTokens(): Promise<string[]> {
  console.log('Fetch access tokens from storage.')
  return await getOdAccessTokens()
}

export async function getObfuscatedAccessTokens(): Promise<string> {
  const _tokens = await getAccessTokens()
  return _tokens.map(obfuscateToken).join(',')
}

/**
 * Match protected routes in site config to get path to required auth token
 * @param path Path cleaned in advance
 * @returns Path to required auth token. If not required, return empty string.
 */
export function getAuthTokenPath(path: string) {
  // Ensure trailing slashes to compare paths component by component. Same for protectedRoutes.
  // Since OneDrive ignores case, lower case before comparing. Same for protectedRoutes.
  path = path.toLowerCase() + '/'
  const protectedRoutes = siteConfig.protectedRoutes as string[]
  let authTokenPath = ''
  for (const r of protectedRoutes) {
    if (typeof r !== 'string') continue
    const lowerCaseR = r.toLowerCase().replace(/\/$/, '') + '/'
    if (path.startsWith(lowerCaseR)) {
      authTokenPath = `${lowerCaseR}.password`
      break
    }
  }
  return authTokenPath
}

/**
 * Handles protected route authentication:
 * - Match the cleanPath against an array of user defined protected routes
 * - If a match is found:
 * - 1. Download the .password file stored inside the protected route and parse its contents
 * - 2. Check if the od-protected-token header is present in the request
 * - The request is continued only if these two contents are exactly the same
 *
 * @param cleanPath Sanitised directory path, used for matching whether route is protected
 * @param accessToken OneDrive API access token
 * @param req Next.js request object
 * @param res Next.js response object
 */
export async function checkAuthRoute(
  cleanPath: string,
  accessToken: string,
  odTokenHeader: string
): Promise<{ code: 200 | 401 | 404 | 500; message: string }> {
  // Handle authentication through .password
  const authTokenPath = getAuthTokenPath(cleanPath)

  // Fetch password from remote file content
  if (authTokenPath === '') {
    return { code: 200, message: '' }
  }

  try {
    const token = await axios.get(`${apiConfig.driveApi}/root${encodePath(authTokenPath)}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        select: '@microsoft.graph.downloadUrl,file',
      },
    })

    // Handle request and check for header 'od-protected-token'
    const odProtectedToken = await axios.get(token.data['@microsoft.graph.downloadUrl'])
    // console.log(odTokenHeader, odProtectedToken.data.trim())

    if (
      !compareHashedToken({
        odTokenHeader: odTokenHeader,
        dotPassword: odProtectedToken.data.toString(),
      })
    ) {
      return { code: 401, message: 'Password required.' }
    }
  } catch (error: any) {
    // Password file not found, fallback to 404
    if (error?.response?.status === 404) {
      return { code: 404, message: "You didn't set a password." }
    } else {
      return { code: 500, message: 'Internal server error.' }
    }
  }

  return { code: 200, message: 'Authenticated.' }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // If method is POST, then the API is called by the client to store acquired tokens
  if (req.method === 'POST') {
    const { obfuscatedAccessToken, accessTokenExpiry, obfuscatedRefreshToken, principal } = req.body
    const accessToken = revealObfuscatedToken(obfuscatedAccessToken)
    const refreshToken = revealObfuscatedToken(obfuscatedRefreshToken)

    if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
      res.status(400).send('Invalid request body')
      return
    }

    await storeOdAuthTokens({ accessToken, accessTokenExpiry, refreshToken, principal })
    res.status(200).send('OK')
    return
  }

  // If method is GET, then the API is a normal request to the OneDrive API for files or folders
  const { path = '/', raw = false, next = '', sort = '' } = req.query

  // Set edge function caching for faster load times, check docs:
  // https://vercel.com/docs/concepts/functions/edge-caching
  res.setHeader('Cache-Control', apiConfig.cacheControlHeader)

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
  // Besides normalizing and making absolute, trailing slashes are trimmed
  const cleanPath = pathPosix.resolve('/', pathPosix.normalize(path)).replace(/\/$/, '')

  // Validate sort param
  if (typeof sort !== 'string') {
    res.status(400).json({ error: 'Sort query invalid.' })
    return
  }

  const accessTokens = readOdConcealedAccessTokens(req.headers['x-connected-accounts'] as string)

  // Return error 403 if access_token is empty
  if (!accessTokens.length || accessTokens.every(token => token == '')) {
    res.status(403).json({ error: 'No access token.' })
    return
  }

  await Promise.all(
    accessTokens.map(accessToken => {
      // Handle protected routes authentication
      return checkAuthRoute(cleanPath, accessToken, req.headers['od-protected-token'] as string)
    })
  ).then(responses => {
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

  // Go for file raw download link, add CORS headers, and redirect to @microsoft.graph.downloadUrl
  // (kept here for backwards compatibility, and cache headers will be reverted to no-cache)
  if (raw) {
    await runCorsMiddleware(req, res)
    res.setHeader('Cache-Control', 'no-cache')

    await Promise.all(
      accessTokens.map(accessToken => {
        return axios
          .get(requestUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: {
              // OneDrive international version fails when only selecting the downloadUrl (what a stupid bug)
              select: 'id,@microsoft.graph.downloadUrl',
            },
          })
          .then(({ data }) => {
            if ('@microsoft.graph.downloadUrl' in data) {
              res.redirect(data['@microsoft.graph.downloadUrl'])
            } else {
              res.status(404).json({ error: 'No download url found.' })
            }
          })
      })
    )

    return
  }

  // search for file across multiple OneDrive accounts (one per access token)
  const responses = await Promise.all(
    accessTokens.map(accessToken => {
      return axios
        .get(requestUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            select: 'name,size,id,lastModifiedDateTime,folder,file,video,image',
          },
        })
        .then(({ data: identityData }) => {
          if ('folder' in identityData) {
            return axios
              .get(`${requestUrl}${isRoot ? '' : ':'}/children`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: {
                  ...{
                    select: 'name,size,id,lastModifiedDateTime,folder,file,video,image',
                    $top: siteConfig.maxItems,
                  },
                  ...(next ? { $skipToken: next } : {}),
                  ...(sort ? { $orderby: sort } : {}),
                },
              })
              .then(async response => {
                if (response.data) {
                  const { data } = response
                  let thumbnailUrl = ''
                  let thumbnailUrls = await Promise.all(
                    data.value.map(value => {
                      thumbnailUrl =
                        path == '/'
                          ? `${getOrigin(req)}/api/thumbnail/?path=/${value.name}/icon.png`
                          : `${getOrigin(req)}/api/thumbnail/?path=${path}/${value.name}/icon.png`
                      // download thumbnail image for each subfolder
                      return axios
                        .post(thumbnailUrl, {
                          // pass obfuscated tokens
                          connectedAccounts: req.headers['x-connected-accounts'],
                        })
                        .then(response => response.data)
                        .catch(err => null) // ignore missing thumbnail
                    })
                  )
                  let oldValue: any = null
                  const _value = thumbnailUrls.map((thumbnailUrl, index) => {
                    oldValue = data.value[index]
                    if (thumbnailUrl) {
                      // attach thumbnail image to each value
                      return { ...oldValue, thumbnailUrl }
                    }
                    return oldValue
                  })
                  // attach updated value to the original data object
                  data.value = _value
                }
                return response
              })
              .then(({ data: folderData }) => {
                // Extract next page token from full @odata.nextLink
                const nextPage = folderData['@odata.nextLink']
                  ? folderData['@odata.nextLink'].match(/&\$skiptoken=(.+)/i)[1]
                  : null
                return Promise.resolve(
                  nextPage ? { folder: folderData, next: nextPage } : ({ folder: folderData } as any)
                )
              })
          } else {
            // get thumbnail image from parent folder
            let segments = path.split('/')
            segments = segments.filter((p, index) => p != '' && index != segments.length - 1)
            const thumbnailUrl = segments.length
              ? `${getOrigin(req)}/api/thumbnail/?path=/${segments.join('/')}/icon.png`
              : null

            const file = Object.assign(identityData, { thumbnailUrl })

            // return file without thumbnail image
            if (!thumbnailUrl) return Promise.resolve({ file } as any)

            // download thumbnail image
            return new Promise(resolve => {
              axios
                .post(thumbnailUrl, {
                  // pass obfuscated tokens (to avoid Redis query on thumbnail API endpoint)
                  connectedAccounts: req.headers['x-connected-accounts'],
                })
                .then(response => {
                  // create new file using thumbnail response
                  const _file = Object.assign(identityData, {
                    thumbnailUrl: response.data,
                  })
                  return resolve({ file: _file } as any)
                })
                .catch(err => resolve({ file } as any)) // ignore missing thumbnail
            })
          }
        })
        .catch(error => {
          // this is an expected error. we only catch it
          // to prevent polluting the error logs, but we do
          // not handle it or report it (and that is by design, intentionally).
          // we expect failure because this code searches
          // for a single file across multiple accounts.
          // (the file won't exist in every account)
        })
    })
  ) // await Promise.all
    .then(responses => {
      return responses.filter(response => response != null)
    })

  if (responses && responses.length) {
    return res.status(200).json(responses.length == 1 ? responses[0] : responses)
  } else {
    res.status(404).end()
  }
}
