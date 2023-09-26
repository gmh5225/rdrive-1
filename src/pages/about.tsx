import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getAccessToken, getOdConcealedAccessTokens } from '../utils/odAuthTokenStore'
import Seo from '../components/Meta/Seo'
import siteConfig from '../config/site.config'

export default function About({ connectedAccounts, token }) {
  const seo = {
    title: `About US | ${siteConfig.title}`,
    description: `Welcome to RDRIVE, your ultimate destination for all things mobile firmware. We pride ourselves on being the go-to platform for hosting a comprehensive collection of mobile firmwares, flash files, custom ROMs, recoveries, dump files, drivers combinations, and eMMC ISP pinouts. Our mission is to ensure that these vital resources are readily available to empower you in maximizing the potential of your mobile devices.`,
    keywords: `RDRIVE.ORG, rdrive, RDRIVE, therockstarind, About US, flash file, flash tool, firmware, emmc isp pinouts, test point, dump file, windows, qcn file`,
    url: `${siteConfig.domain}/about`,
    ogImage: `${siteConfig.domain}/icons/about.png`,
    color: '#000000',
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
      <Seo {...seo} />
      <main className="flex w-full flex-1 flex-col bg-white dark:bg-black">
        <Navbar />
        <div className="mx-auto w-full max-w-6xl p-4 text-black dark:text-white">
          <h1 className="mb-4 text-center text-[30px] font-bold">
           About US
          </h1>
          <p className="py-2">
            Welcome to <strong>RDRIVE</strong>, your ultimate destination for all things mobile firmware. We pride ourselves on being the go-to platform for hosting a comprehensive collection of <strong>Mobile Firmware, Flash File, Flash Tool, Custom ROMs, Recoveries, TWRP, Dump Files, Drivers, Combination, and eMMC ISP Pinout</strong>. Our mission is to ensure that these vital resources are readily available to empower you in maximizing the potential of your mobile devices.
          </p>
          <p className="py-2">
            At <strong>RDRIVE</strong>, we understand the importance of having access to the latest firmware files and tools. That&apos;s why our dedicated team curates and develops an extensive library of files, sourced both internally and from other reputable websites. By hosting these files on our servers, we guarantee their long-term availability, eliminating the frustration of broken or inaccessible links.
          </p>
          <p className="py-2">
            Our server is open and free for all users, allowing you to download files effortlessly. However, we also encourage collaboration and community engagement. If you have valuable files that you would like to share with the mobile community, you can contact us for permission to upload them to our platform. We believe in fostering a spirit of collaboration and knowledge-sharing to benefit mobile enthusiasts and professionals alike.
          </p>
          <p className="py-2">
            Join our thriving community of tech-savvy individuals, developers, and enthusiasts who rely on <strong>RDRIVE</strong> as their trusted resource. Discover the latest firmware updates, explore custom ROMs to personalize your mobile experience, recover data with ease, and access the tools and drivers you need for successful device flashing. Unleash the true potential of your mobile devices with <strong>RDRIVE</strong> today.
          </p>
          <p className="py-2">
            Remember, at <strong>RDRIVE</strong>, we&apos;re here to support you every step of the way. If you have any questions, suggestions, or need assistance, don&apos;t hesitate to reach out to our friendly team. Together, let&apos;s create a vibrant and knowledgeable community where mobile technology knows no boundaries. Start your journey with <strong>RDRIVE</strong> and unlock a world of possibilities for your mobile devices.
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
