import Redis from 'ioredis'
import siteConfig from '../config/site.config'
import { obfuscateToken, revealObfuscatedToken } from './oAuthHandler'

// TODO: manage Redis connections more efficiently (or use @upstash/redis)
// https://docs.upstash.com/redis/troubleshooting/max_concurrent_connections
// we keep getting this error: MaxListenersExceededWarning: Possible EventEmitter
// memory leak detected. 11 server/api/thumbnail listeners added to [EventEmitter].
// Use emitter.setMaxListeners() to increase limit

// Persistent key-value store is provided by Redis, hosted on Upstash
// https://vercel.com/integrations/upstash
const kv = new Redis(process.env.REDIS_URL || '')

export async function getAccessToken(principalId: number): Promise<string | null> {
  return await kv.get(`${siteConfig.kvPrefix}access_token${principalId}`)
}

export async function getPrincipals(): Promise<{ [keyId: string]: string }> {
  let keyIds = ((await kv.keys('[0-9]*')) || []).filter(id => /^\d+$/gi.test(id))
  let principals = await Promise.all(
    keyIds.map(id => {
      return kv.get(id).then(principal => ({ principal, id }))
    })
  )
  return principals
    .filter(p => p.principal != '' && p.principal != null)
    .reduce((map, p) => {
      map[p.id] = p.principal
      return map
    }, {})
}

export async function deleteKeys(...keyNames: string[]): Promise<void> {
  await Promise.all(
    keyNames.map(keyName => {
      return kv.del(keyName)
    })
  )
}

export async function getRefreshToken(id: number): Promise<string> {
  return (await kv.get(`${siteConfig.kvPrefix}refresh_token${id}`)) || ''
}

export async function getKeys(keyName: string): Promise<string[]> {
  // get all key names that match keyName (such as "access_token0", "access_token1", "access_token2", ...)
  return ((await kv.keys(`${keyName}*`)) || []).sort()
}

export function getKeyId(keyName): Number {
  // get trailing digit from the key name
  //    for example:
  //    /\d+$/.exec("access_token55") will return ['55', index: 12, input: 'access_token55', groups: undefined]
  //    /\d+$/.exec("access_token") will return null
  const exec_arr: RegExpExecArray | null = /\d+$/.exec(keyName)
  return exec_arr ? Number(exec_arr[0]) : 0
}

export async function getOdAccessTokens(): Promise<string[]> {
  const keys: string[] | null = await getKeys(`${siteConfig.kvPrefix}access_token*`)

  if (!keys) return []

  const tokens = await Promise.all(
    keys.map(async keyName => {
      let keyId: Number = getKeyId(keyName)
      return (await kv.get(`${siteConfig.kvPrefix}access_token${keyId}`)) || ''
    })
  )

  return tokens.filter(t => t != '')
}

export async function getOdConcealedAccessTokens(): Promise<string> {
  let tokens = await getOdAccessTokens()
  return tokens.map(token => obfuscateToken(token)).join(',')
}

export function readOdConcealedAccessTokens(connectedAccounts: string): string[] {
  if (!connectedAccounts) console.warn('no connected accounts')
  return connectedAccounts.split(',').map(token => revealObfuscatedToken(token))
}

export async function getNextKey(keyName): Promise<{ keyName: string; id: any }> {
  if (!keyName) throw 'Missing argument: keyName'

  const keys: string[] | null = await getKeys(keyName)

  let id = 0

  if (keys && keys.length) {
    const lastKeyName = keys.sort().pop()
    id = (getKeyId(lastKeyName) as number) + 1
  }

  return {
    keyName: `${keyName}${id}`,
    id,
  }
}

export async function updateOdAuthTokens({
  accessToken,
  accessTokenExpiry,
  refreshToken,
  id,
}: {
  accessToken: string
  accessTokenExpiry: number
  refreshToken: string
  id: any
}): Promise<void> {
  await kv.set(`${siteConfig.kvPrefix}access_token${id}`, accessToken, 'EX', accessTokenExpiry)
  await kv.set(`${siteConfig.kvPrefix}refresh_token${id}`, refreshToken)
}

export async function storeOdAuthTokens({
  accessToken,
  accessTokenExpiry,
  refreshToken,
  principal,
}: {
  accessToken: string
  accessTokenExpiry: number
  refreshToken: string
  principal: string
}): Promise<void> {
  const keyResult = await getNextKey(`${siteConfig.kvPrefix}access_token`)
  await Promise.all([
    kv.set(keyResult.keyName, accessToken, 'EX', accessTokenExpiry),
    kv.set(`${siteConfig.kvPrefix}refresh_token${keyResult.id}`, refreshToken),
    kv.set(keyResult.id, principal),
  ])
}

export async function getUserStatus(id) {
  return await kv.get(id)
}
export async function storeUserStatus(id, data) {
  await kv.set(id, JSON.stringify(data))
}
