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
import { FolderCardAnimation } from '../utils/FramerMotionVariants';
import { motion } from 'framer-motion';

export default function Share() {
  const { query, asPath } = useRouter();
  const clipboard = useClipboard();
  const URL = `/api/og/?link=/${asPath}/`;
  const title = (query.path && Array.isArray(query.path) ? query.path[query.path.length - 1] : '').replaceAll('-', ' ').replaceAll('_', ' ');

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
    const customUrl = `${siteConfig.telegram}`;
    const currentUrl = `${getBaseUrl()}${asPath}`;
    navigator.clipboard.writeText(currentUrl).then(() => {
      window.open(customUrl, '_blank');
    });
  };

  return (
    <main>
      <Model
        open={<div><FiShare size={34} className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full mx-auto text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white cursor-pointer" /></div>}
        content={
          <motion.article
            variants={FolderCardAnimation}
            viewport={{ once: true }}
            className="flex flex-col items-center w-full mx-auto gap-3"
          >
            <FiShare size={38} className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full mx-auto" />
            <h1 className="text-xl font-semibold pr-3 line-clamp-1">Share {title}</h1>
            <Image
              src={URL}
              alt={title}
              width={1200}
              height={600}
            />
            <div className="flex flex-col w-full h-full gap-2">
              <div className="flex items-center justify-between gap-2 xss:flex-wrap xs:flex-nowrap">
                <Button className="w-full bg-[rgba(0,112,243,0.1)]" onPress={shareOnTwitter}>
                  <div className="flex items-center justify-center w-8 h-8">
                    <RiTwitterXFill size={22} />
                  </div>
                  <div>Share on Twitter</div>
                </Button>
                <Button className="w-full bg-[rgba(0,112,243,0.1)]" onPress={shareOnFacebook}>
                  <div className="flex items-center justify-center w-8 h-8">
                    <BsFacebook size={22} />
                  </div>
                  <div>Share on Facebook</div>
                </Button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Button className="w-full bg-[rgba(0,112,243,0.1)]" onPress={copyLinkToClipboard}>
                  <div className="flex items-center justify-center w-8 h-8">
                    <BsLink45Deg size={22} />
                  </div>
                  <div>Copy Link</div>
                </Button>
                <Button className="w-full bg-[rgba(0,112,243,0.1)]" onPress={reportOnTelegram}>
                  <div className="flex items-center justify-center w-8 h-8">
                    <GoReport size={22} />
                  </div>
                  <div>Report Link</div>
                </Button>
              </div>
            </div>
          </motion.article>
        }
      />
    </main>
  );
}
