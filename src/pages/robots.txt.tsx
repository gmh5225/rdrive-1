import React from 'react';
import { getOrigin } from '../utils/getBaseUrl';

class Robots extends React.Component {
  static async getInitialProps({ req, res }) {
    res.setHeader('Content-Type', 'text/plain');
    res.write(`User-agent: *\nSitemap: ${getOrigin(req)}/sitemap.xml`);
    res.end();
  }
}

export default Robots;