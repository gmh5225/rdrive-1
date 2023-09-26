import React from 'react';
import siteConfig from '../config/site.config';
import Link from 'next/link';
import SocialFooter from './Links/SocialFooter';
import FooterLinks from './Links/footerLinks';
import Bar from './Bar';
import ThemeSwitcher from './Links/ThemeSwitcher';
import { Image } from '@nextui-org/react';

const Footer = ({token}) => {
    
  return (
    <>
    <footer className="w-full border-t dark:border-gray-700 text-black dark:text-white hidden md:block px-2">
      <div className="mx-auto w-full max-w-6xl my-4">
      <div className="flex justify-between items-center my-6 px-2">
          <SocialFooter />
          <FooterLinks token={token} />
      </div>
        <div className="flex justify-between items-center my-4">
          <Link href="/" passHref>
              <div className="flex items-center text-xs md:text-sm">
                <Image src={siteConfig.icon} alt={siteConfig.title} width={35} height={35} />
                <span className="ml-1">&copy; {new Date().getFullYear()}</span>
              </div>
          </Link>
          <ThemeSwitcher />
        </div>
      </div> 
    </footer>
    <footer className="w-full border-t dark:border-gray-700 text-black dark:text-white mb-16 block md:hidden">
      <div className="mx-auto w-full max-w-6xl my-4">
          <Link  className="flex items-center text-sm px-5 my-4" href="/" passHref>
                <Image src={siteConfig.icon} alt={siteConfig.title} width={40} height={40} />
                <span className="ml-1">&copy; {new Date().getFullYear()}</span>
          </Link>
          <div className="px-6 my-4"><FooterLinks token={token} /></div>
      <div className="mx-auto flex items-center justify-between px-6">
          <SocialFooter />
          <ThemeSwitcher />
      </div>
      </div> 
    </footer>
    <Bar />
    </>
  );
};

export default Footer;
