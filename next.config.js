const { i18n } = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withBundleAnalyzer(
  withPWA({
    env: {
      HIDDEN_FOLDERS_RGX: process.env.HIDDEN_FOLDERS_RGX,
      SITE_TITLE: process.env.SITE_TITLE,
      SITE_FOOTER: process.env.SITE_FOOTER,
      DOMAIN: process.env.DOMAIN,
      GITHUB: process.env.GITHUB,
      TELEGRAM: process.env.TELEGRAM,
      YOUTUBE: process.env.YOUTUBE,
      WHATSAPP: process.env.WHATSAPP,
      UPLOAD: process.env.UPLOAD,
      NO_IMAGE: process.env.NO_IMAGE,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      PERSONAL_ACCESS_TOKEN:process.env.PERSONAL_ACCESS_TOKEN
    },
    images: {
      domains: [ 
        'localhost', 
        'southindia1-mediap.svc.ms',
        'centralindia1-mediap.svc.ms',
        'RDRIVE.ORG', 
        'res.cloudinary.com', 
        'img.icons8.com',
        'cdn3d.iconscout.com'
      ],
    },
    i18n,
    reactStrictMode: false,
    // Required by Next i18n with API routes, otherwise API routes 404 when fetching without trailing slash
    trailingSlash: true,
  })
);
