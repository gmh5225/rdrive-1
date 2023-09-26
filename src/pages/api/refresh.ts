import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteKeys, getKeys, getPrincipals, getRefreshToken, updateOdAuthTokens } from '../../utils/odAuthTokenStore';
import siteConfig from '../../config/site.config'
import apiConfig from '../../config/api.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // each principal should have a refresh token

  const refreshTokenKeys = await getKeys(`${siteConfig.kvPrefix}refresh_token*`)
  const principals = await getPrincipals();
  const principalIds = Object.keys(principals);

  let _principals: string[] = []; 
  let accountsRefreshed = 0;

  // find out which principals
  // have a missing refresh token
  return Promise.all(principalIds.map(id => {
    const refreshTokenKey = `${siteConfig.kvPrefix}refresh_token${id}`;
    const accessTokenKey = `${siteConfig.kvPrefix}access_token${id}`;
    const refreshTokenIndex = refreshTokenKeys.indexOf(refreshTokenKey);

    // if the principal has no refresh token
    if(refreshTokenIndex < 0){
      
      // record the principal name
      _principals.push(principals[id]);

      // delete the principal and any associated access token
      return deleteKeys(id, accessTokenKey);

    }

    // if the principal has a refresh token
    // then use it to perform a token refresh
    return performTokenRefresh(Number(id)).then(() => accountsRefreshed++);

  })).then(() => {
    
    const missingAccounts = _principals.length;
    
    if(missingAccounts){
      console.warn("please re-authenticate the following OneDrive accounts: ", _principals);
    }

    res.json({
      missingAccounts,
      accountsRefreshed,
      message: `${accountsRefreshed} tokens refreshed. ${missingAccounts} accounts need to re-authenticate.`
    })

  })
  .catch(error => {
    res.status(error?.response?.status ?? 500).json({ error: error?.response?.data ?? 'Internal server error.' })
  })

}

async function performTokenRefresh(refreshTokenId: number): Promise<string>{
  
  const refreshToken = await getRefreshToken(refreshTokenId);
  
  const clientSecret = apiConfig.clientSecret;

  // Fetch new access token with in storage refresh token
  const body = new URLSearchParams()
  body.append('client_id', apiConfig.clientId)
  body.append('redirect_uri', apiConfig.redirectUri)
  body.append('client_secret', clientSecret)
  body.append('refresh_token', refreshToken)
  body.append('grant_type', 'refresh_token')

  const resp = await axios.post(apiConfig.authApi, body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  if ('access_token' in resp.data && 'refresh_token' in resp.data) {
    const { expires_in, access_token, refresh_token } = resp.data
    await updateOdAuthTokens({
      accessToken: access_token,
      accessTokenExpiry: parseInt(expires_in),
      refreshToken: refresh_token,
      id: refreshTokenId
    })
    console.log('Fetch new access token with stored refresh token.')
    return access_token
  }

  return ''
}
