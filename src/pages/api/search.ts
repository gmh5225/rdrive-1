import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import apiConfig from '../../config/api.config';
import siteConfig from '../../config/site.config';
import { readOdConcealedAccessTokens } from '../../utils/odAuthTokenStore';

const searchResultsCache = new Map<string, any[]>();

function sanitiseQuery(query: string): string {
  const sanitisedQuery = query
    .replace(/'/g, "''")
    .replace('<', ' &lt; ')
    .replace('>', ' &gt; ')
    .replace('?', ' ')
    .replace('/', ' ')
  return encodeURIComponent(sanitisedQuery)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessTokens = readOdConcealedAccessTokens(req.headers['x-connected-accounts'] as string);
  const { q: searchQuery = '' } = req.query;

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

  if (typeof searchQuery === 'string') {
    if (searchResultsCache.has(searchQuery)) {
      return res.status(200).json(searchResultsCache.get(searchQuery));
    }

    const searchApi = `${apiConfig.driveApi}/root/search(q='${sanitiseQuery(searchQuery)}')`;

    const searchResults = await Promise.all(accessTokens.map(async (accessToken, tokenId) => {
      return axios.get(searchApi, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          select: 'id,name,file,folder,size,lastModifiedDateTime,parentReference',
          top: siteConfig.searchmaxItems,
        },
      }).then(results => {
        return results.data.value && results.data.value.length ?
          results.data.value.map(v => ({ ...v, tokenId })) :
          [];
      }).catch(err => {
        return null;
      });
    })).then(responses => {
      const combinedResults = responses.reduce((arr, response) => {
        return arr.concat(response);
      }, []);
      searchResultsCache.set(searchQuery, combinedResults);
      return combinedResults;
    });

    res.status(200).json(searchResults);
  } else {
    res.status(200).json([]);
  }
}
