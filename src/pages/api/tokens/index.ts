import type { NextApiRequest, NextApiResponse } from 'next'
import { getOdConcealedAccessTokens } from '../../../utils/odAuthTokenStore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connectedAccounts = await getOdConcealedAccessTokens();
  res.setHeader('content-type', 'text/plain').status(200).send(connectedAccounts)
}
