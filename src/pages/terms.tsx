import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getAccessToken, getOdConcealedAccessTokens } from '../utils/odAuthTokenStore'

import Link from 'next/link'
import Seo from '../components/Meta/Seo'
import siteConfig from '../config/site.config'

export default function Home({ connectedAccounts, token }) {
  const seo = {
    title: `Terms and rules | ${siteConfig.title}`,
    description: `The providers (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) of the service provided by this web site (&quot;Service&quot;) are not responsible for any user-generated content and accounts. Content submitted express the views of their author only.`,
    keywords: `RDRIVE.ORG, rdrive, RDRIVE, therockstarind, Terms and rules, flash file, flash tool, firmware, emmc isp pinouts, test point, dump file, windows, qcn file`,
    url: `${siteConfig.domain}/Terms-and-rules`,
    ogImage: `${siteConfig.domain}/icons/terms.png`,
    color: '#000000',
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
      <Seo {...seo} />
      <main className="flex w-full flex-1 flex-col bg-white dark:bg-black">
        <Navbar />
        <div className="mx-auto w-full max-w-6xl p-4 text-black dark:text-white">
          <h1 className="mb-4 text-center text-[30px] font-bold">
           Terms and rules
          </h1>
          <p className="py-2">
           The providers (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) of the service provided by this web site (&quot;Service&quot;) are not responsible for any user-generated content and accounts. Content submitted express the views of their author only.
          </p>
          <p className="py-2">
           This Service is only available to users who are at least 18 years old. If you are younger than this, please do not register for this Service. If you register for this Service, you represent that you are this age or older.
          </p>
          <p className="py-2">
           All content you submit, upload, or otherwise make available to the Service (&quot;Content&quot;) may be reviewed by staff members. All Content you submit or upload may be sent to third-party verification services (including, but not limited to, spam prevention services). Do not submit any Content that you consider to be private or confidential.
          </p>
          <p className="py-2">
           You agree to not use the Service to submit or link to any Content which is defamatory, abusive, hateful, threatening, spam or spam-like, likely to offend, contains adult or objectionable content, contains personal information of others, risks copyright infringement, encourages unlawful activity, or otherwise violates any laws. You are entirely responsible for the content of, and any harm resulting from, that Content or your conduct.
          </p>
          <p className="py-2">
           We may remove or modify any Content submitted at any time, with or without cause, with or without notice. Requests for Content to be removed or modified will be undertaken only at our discretion. We may terminate your access to all or any part of the Service at any time, with or without cause, with or without notice.
          </p>
          <p className="py-2">
           You are granting us with a non-exclusive, permanent, irrevocable, unlimited license to use, publish, or re-publish your Content in connection with the Service. You retain copyright over the Content.
          </p>
          <p className="py-2">
           These terms may be changed at any time without notice.
          </p>
          <p className="py-2">
           If you do not agree with these terms, please do not register or use the Service. Use of the Service constitutes acceptance of these terms. If you wish to close your account, please 
           <Link href={'/privacy-policy'} className='text-[#A020F0]' > Contact Us.</Link>
          </p>
        </div>
      </main>

      <Footer token={token}/>
      <input type="hidden" id="connectedAccounts" value={connectedAccounts} />
    </div>
  )
}

export async function getServerSideProps({req, locale }) {
  const connectedAccounts = await getOdConcealedAccessTokens();

  const token = await getAccessToken(0);

  return {
          props: {
                  ...(await serverSideTranslations(locale, ['common'])),
                          connectedAccounts,
                          token,
                          
          },
  }
}
