import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import siteConfig from '../config/site.config'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import { getAccessToken, getOdConcealedAccessTokens } from '../utils/odAuthTokenStore'
import Seo from '../components/Meta/Seo'
import Description from '../utils/description'
import dynamic from 'next/dynamic'
const FileListing = dynamic(() => import('../components/FileListing'))

export default function Route({ connectedAccounts, token, ogImage }) {
  const { query } = useRouter()
  const { asPath } = useRouter()
  const fileName = (query.path && Array.isArray(query.path) ? query.path[query.path.length - 1] : '').replaceAll('-', ' ').replaceAll('_', ' ');
  const extensionIndex = fileName.lastIndexOf('.');
  const title = extensionIndex !== -1 ? fileName.slice(0, extensionIndex) : fileName;

  const seo = {
    title: `${title} | ${siteConfig.title}`,
    description: Description(),
    keywords: `${title}, flash-file, flash-tool, EMMC ISP Pinouts, Operating Systems, Graphic Design, Multimedia, Development, Education, ${siteConfig.title}`,
    url: `${siteConfig.domain}${asPath}`,
    ogImage,
    color: '#000000',
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
      <Seo {...seo} />
      <main className="flex w-full flex-1 flex-col bg-white dark:bg-black">
        <Navbar />
        <div className="mx-auto w-full max-w-6xl p-2">
        <nav className="border dark:border-gray-700 rounded-lg flex items-center justify-between p-2 my-2">
            <Breadcrumb query={query} />
          </nav>
          <div className="my-4">
            <FileListing query={query} token={token} />
          </div>
        </div>
      </main>
      <Footer token={token} />
      <input type="hidden" id="connectedAccounts" value={connectedAccounts} />
    </div>
  )
}

export async function getServerSideProps({ resolvedUrl, locale }) {
  const connectedAccounts = await getOdConcealedAccessTokens()
  const token = await getAccessToken(0)
  const ogImageUrl = `${siteConfig.domain}/api/og/?link=${resolvedUrl.split('?')[0]}`;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      connectedAccounts,
      token,
      ogImage: ogImageUrl,
    },
  }
}
