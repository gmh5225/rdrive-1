import React from 'react';
import { FaWhatsapp, FaTelegram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { GoReport } from 'react-icons/go';

import Hover from './Tooltip/Tooltip';;
import siteConfig from '../config/site.config';

const ShareReport: React.FC = () => {
  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`);
  };

  const shareOnTelegram = () => {
    window.open(`https://telegram.me/share/url?url=${encodeURIComponent(window.location.href)}`);
  };

  const shareOnTwitter = () => {
    const text = 'Check out this link:';
    const url = window.location.href;
    const hashtags = 'example,share';
    const twitterIntentURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
    window.open(twitterIntentURL);
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
  };

  const ReportOnTelegram = () => {
    const customUrl = `https://t.me/${siteConfig.telegram}`
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      window.open(customUrl, '_blank');
    });
  };

  return (
    <div>
      <Hover tipChildren="Share on WhatsApp">
        <button
          type="button"
          onClick={shareOnWhatsApp}
          className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-green-400 mr-2 mb-2 space-x-2"
        >
          <FaWhatsapp className="w-4 h-4" />
          <span className="hidden sm:block">WhatsApp</span>
        </button>
      </Hover>
      <Hover tipChildren="Share on Telegram">
        <button
          type="button"
          onClick={shareOnTelegram}
          className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-400 mr-2 mb-2 space-x-2"
        >
          <FaTelegram className="w-4 h-4" />
          <span className="hidden sm:block">Telegram</span>
        </button>
      </Hover>
      <Hover tipChildren="Share on Twitter">
        <button
          type="button"
          onClick={shareOnTwitter}
          className="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-300 mr-2 mb-2 space-x-2"
        >
          <FaTwitter className="w-4 h-4" />
          <span className="hidden sm:block">Twitter</span>
        </button>
      </Hover>
      <Hover tipChildren="Share on Facebook">
        <button
          type="button"
          onClick={shareOnFacebook}
          className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-600 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-700 mr-2 mb-2 space-x-2"
        >
          <FaFacebook className="w-4 h-4" />
          <span className="hidden sm:block">Facebook</span>
        </button>
      </Hover>
      <Hover tipChildren="Report on Telegram">
        <button
          type="button"
          onClick={ReportOnTelegram}
          className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-red-500 mr-2 mb-2 space-x-2"
        >
          <GoReport className="w-4 h-4" />
          <span className="hidden sm:block">Report</span>
        </button>
      </Hover>
    </div>
  );
};

export default ShareReport;
