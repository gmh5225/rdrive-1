import Link from 'next/link';
import React from 'react';
import Model from '../Tooltip/Model';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { BsChatSquareDots, BsFillJournalBookmarkFill } from 'react-icons/bs';
import { MdPrivacyTip } from 'react-icons/md';
import { BiUserPin } from 'react-icons/bi';
import siteConfig from '../../config/site.config';

const Legal = () => {
  const Icon = "text-xl text-default-500 dark:text-white pointer-events-none flex-shrink-0";
  const legalLinks = [
    { text: 'About US', url: '/about', icon: <BiUserPin  className={Icon} /> },
    { text: 'Privacy Policy', url: '/privacy-policy', icon: <MdPrivacyTip className={Icon} /> },
    { text: 'Terms of Service', url: '/terms', icon: <BsFillJournalBookmarkFill className={Icon} /> },
  ];

  return (
    <main>
      <Model 
        open={<div>Legal</div>} 
        content={
          <main>
            <Listbox variant="bordered" aria-label="Legal Links">
            {legalLinks.map(({ text, url, icon }) => (
              <ListboxItem
                key={text}
                startContent={icon}
              >
                <Link href={url} className="dark:text-white">{text}</Link>
              </ListboxItem>
            ))}
          </Listbox>
          <Listbox variant="bordered" aria-label="Report & Feedback">
                <ListboxItem
                  key="Report & Feedback"
                  className="text-danger"
                  startContent={<BsChatSquareDots className="text-xl text-danger" />}
                >
                  <Link 
                      href={`https://t.me/${siteConfig.telegram}`}
                      target="_blank">
                        Report & Feedback
                  </Link>
                </ListboxItem>
            </Listbox>
            </main>
        } 
      />
    </main>
  );
};

export default Legal;
