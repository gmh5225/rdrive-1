import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import siteConfig from '../config/site.config';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAccessToken, getOdConcealedAccessTokens } from '../utils/odAuthTokenStore';
import Seo from '../components/Meta/Seo';
import dynamic from 'next/dynamic';

const FileListing = dynamic(() => import('../components/FileListing'));

export default function Home({ connectedAccounts, token }) {
  const seo = {
    title: `${siteConfig.title} - Get access to Flash File, Dump File, QCN File, MDM File, FRP, Flash Tool, EMMC ISP Pinouts, Windows Files.`,
    description: 'RDRIVE Provide Mobile Firmwares Drivers Flash Tool FRP Dump FIle EMMC ISP PinOut Samsung MDM File Windows Files.',
    keywords: 'RDRIVE.ORG, rdrive, RDRIVE, therockstarind, flash file, flash tool, firmware, emmc isp pinouts, test point, dump file, windows, qcn file',
    url: `${siteConfig.domain}`,
    ogImage: `${siteConfig.domain}/icons/512.png`,
    color: '#000000',
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
      <Seo {...seo} />
      <main className="flex w-full flex-1 flex-col bg-white dark:bg-black">
        <Navbar />
        <div className="mx-auto w-full max-w-6xl p-2">
          <div className="my-4">
            <FileListing token={token} />
          </div>
        </div>
      </main>
      <Footer token={token} />
      <input type="hidden" id="connectedAccounts" value={connectedAccounts} />
    </div>
  );
}

export async function getServerSideProps({ req, locale }) {
  const connectedAccounts = await getOdConcealedAccessTokens();
  const token = await getAccessToken(0);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      connectedAccounts,
      token,
    },
  };
}
