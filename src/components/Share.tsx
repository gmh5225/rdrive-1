import siteConfig from '../config/site.config';
import { FiShare } from 'react-icons/fi';
import { Button, Image } from '@nextui-org/react';
import { RiTwitterXFill } from 'react-icons/ri';
import { BsCheck2, BsFacebook, BsLink45Deg } from 'react-icons/bs';
import { GoReport } from 'react-icons/go';
import { useClipboard } from 'use-clipboard-copy';
import Model from './Tooltip/Model';
import toast from 'react-hot-toast';
import { getBaseUrl } from '../utils/getBaseUrl';
import { useRouter } from 'next/router';

export default function Share({ }) {
  const { query, asPath } = useRouter()
    const clipboard = useClipboard()
    const URL = `/api/og/?link=/${asPath}`;
    const title = (query.path && Array.isArray(query.path) ? query.path[query.path.length - 1] : '').replaceAll('-', ' ').replaceAll('_', ' ');

  // const shareOnWhatsApp = () => {
  //   window.open(`https://api.whatsapp.com/send?text=${getBaseUrl()}${asPath}`);
  // };

  // const shareOnTelegram = () => {
  //   window.open(`https://telegram.me/share/url?url=${getBaseUrl()}${asPath}`);
  // };

  const shareOnTwitter = () => {
    const text = `${title}`;
    const url = `${getBaseUrl()}${asPath}`;
    const hashtags = 'RDrive, RDRIVE.ORG';
    const twitterIntentURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
    window.open(twitterIntentURL);
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${getBaseUrl()}${asPath}`);
  };

  const copyLinkToClipboard = () => {
    clipboard.copy(`${getBaseUrl()}${asPath}`);
    toast('Link copied', { icon: <BsCheck2 /> });
  };

  const reportOnTelegram = () => {
    const customUrl = `https://t.me/${siteConfig.telegram}`;
    const currentUrl = `${getBaseUrl()}${asPath}`;
    navigator.clipboard.writeText(currentUrl).then(() => {
      window.open(customUrl, '_blank');
    });
  };

  return (
    <main>
      <Model
        open={<div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full cursor-pointer"><FiShare className="h-4 w-4 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" /></div>}
        content={
          <main className="text-center">
            <FiShare size={38} className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full mx-auto my-2" />
            <h1 className="text-xl my-3 font-semibold pr-3 line-clamp-1">Share {title}</h1>
            <div className="h-52">
              <Image
                alt={title}
                className="mx-auto rounded-lg object-contain object-center"
                src={URL}
                loading="eager"
              />
            </div>
            <div className="flex justify-center gap-2 items-center mt-6">
              <Button startContent={<RiTwitterXFill size={22} />} className="w-52" onClick={shareOnTwitter}>
                Share on Twitter
              </Button>
              <Button startContent={<BsFacebook size={22} />} className="w-52" onClick={shareOnFacebook}>
                Share on Facebook
              </Button>
            </div>
            {/* <div className="flex justify-center space-x-4 items-center my-2">
              <Button startContent={<BsTelegram size={22} />} className="w-52" onClick={shareOnTelegram}>
                Share on Telegram
              </Button>
              <Button startContent={<BsWhatsapp size={22} />} className="w-52" onClick={shareOnWhatsApp}>
               Share on WhatsApp
              </Button>
            </div> */}
            <div className="flex justify-center gap-2 items-center my-2">
              <Button startContent={<BsLink45Deg size={22} />} className="w-52" onClick={copyLinkToClipboard}>
                Copy Link
              </Button>
              <Button startContent={<GoReport size={22} />} className="w-52" onClick={reportOnTelegram}>
                Report Link
              </Button>
            </div>
          </main>
        }
      />
    </main>
  );
}
