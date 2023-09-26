import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import siteConfig from '../config/site.config'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getAccessToken, getOdConcealedAccessTokens } from '../utils/odAuthTokenStore'

import Seo from '../components/Meta/Seo'
import MarkdownPreview from '../components/previews/MarkdownPreview'

export default function Home({ connectedAccounts, token }) {
  const seo = {
    title: `Service Center Price List | ${siteConfig.title}`,
    description: `All Brand Service Center Price List`,
    keywords: `RDRIVE.ORG, Service Center Price List, rdrive, RDRIVE, therockstarind, Terms and rules, flash file, flash tool, firmware, emmc isp pinouts, test point, dump file, windows, qcn file`,
    url: `${siteConfig.domain}/service-center-price-list`,
    ogImage: `${siteConfig.domain}/icons/price-list.png`,
    color: '#000000',
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
      <Seo {...seo} />
      <main className="flex w-full flex-1 flex-col bg-white dark:bg-black">
        <Navbar />
        <div className="mx-auto w-full max-w-6xl p-4 text-black dark:text-white">
        <MarkdownPreview file={{ name: 'readme.mdx' }} path={'RockStar/Price-List'} standalone={false} />
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

