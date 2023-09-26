import axios from 'axios';
import React from 'react';
import { getOrigin } from '../utils/getBaseUrl';
import { DriveItemResult } from './api/driveItems';

class Sitemap extends React.Component {
  static async getInitialProps({ req, res }) {
    const origin = getOrigin(req);
    const urls = [
      "/about/",
      "/terms/", 
      "/privacy-policy/",
      ... (await getSiteMapUrls(origin))
    ];
    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(urls, origin));
    res.end();
  }
}

function createSitemap(urls: string[], origin){
  return `<?xml version="1.0" encoding="UTF-8"?>
          <urlset
                xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

            <url>
              <loc>${origin}</loc>
              <priority>1.00</priority>
            </url>

            ${urls.map(url => (
              `<url>
                <loc>${origin}${url}</loc>
                <priority>0.90</priority>
              </url>`)).join('')}

          </urlset>`;
}

async function getSiteMapUrls(origin: string){
  const response = await axios.get(`${origin}/api/driveItems`);
  const result: DriveItemResult = response.data as DriveItemResult;
  const urls: string[] = result.children.map(child => {
    let url = new URL(child)
    let query = new URLSearchParams(url.search);
    return `/${query.get('path')?.split(',').join('/')}`;
  })
  return urls;
}

export default Sitemap;