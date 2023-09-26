/**
 * This file contains the configuration used for customising the website, such as the folder to share,
 * the title, used Google fonts, site icons, contact info, etc.
 */
 module.exports = {
  // This is what we use to identify who you are when you are initialising the website for the first time.
  // Make sure this is exactly the same as the email address you use to sign into your Microsoft account.
  // You can also put this in your Vercel's environment variable 'NEXT_PUBLIC_USER_PRINCIPLE_NAME' if you worry about
  // your email being exposed in public.
  userPrincipalName: process.env.NEXT_PUBLIC_USER_PRINCIPLE_NAME || '',

  // [OPTIONAL] This is the website icon to the left of the title inside the navigation bar. It should be placed under the
  // /public directory of your GitHub project (not your OneDrive folder!), and referenced here by its relative path to /public.
  icon: '/icons/512.png',

  // Prefix for KV Storage
  kvPrefix: process.env.KV_PREFIX || '',

  // The name of your website. Present alongside your icon.
  title: process.env.SITE_TITLE || '',

  // The name of your website. Present in your footer.
  footer: process.env.SITE_FOOTER || '',
  domain: process.env.DOMAIN || '',

  // upload link
  upload: process.env.UPLOAD || '',
  //social links 
  github: process.env.GITHUB || '',
  telegram: process.env.TELEGRAM || '',
  youtube: process.env.YOUTUBE || '',
  whatsapp: process.env.WHATSAPP || '',

  
  noimage: process.env.NO_IMAGE || '',

  // The folder that you are to share publicly with RDRIVE. Use '/' if you want to share your root folder.
  baseDirectory: '/RDRIVE',

  // [OPTIONAL] This represents the maximum number of items that one directory lists, pagination supported.
  // Do note that this is limited up to 200 items by the upstream OneDrive API.
  maxItems: 52,
  searchmaxItems: 200,

  // [OPTIONAL] This is where you specify the folders that are password protected. It is an array of paths pointing to all
  // the directories in which you have .password set. Check the documentation for details.
  protectedRoutes: ['/Yolo'],
}
