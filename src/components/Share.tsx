// import { FaWhatsapp, FaTelegram, FaTwitter, FaFacebook } from 'react-icons/fa';
// import { GoReport } from 'react-icons/go';
// import { Menu, Transition } from '@headlessui/react';
// import { Fragment, useEffect, useRef, useState } from 'react';

// import siteConfig from '../config/site.config';
// import { IoShareSocial } from 'react-icons/io5';
// import { useRouter } from 'next/router';

// export default function Share() {
//     const { query, asPath } = useRouter()
//     const title = (query.path && Array.isArray(query.path) ? query.path[query.path.length - 1] : '').replaceAll('-', ' ').replaceAll('_', ' ');
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement | null>(null);

//   const shareOnWhatsApp = () => {
//     window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`);
//   };

//   const shareOnTelegram = () => {
//     window.open(`https://telegram.me/share/url?url=${encodeURIComponent(window.location.href)}`);
//   };

//   const shareOnTwitter = () => {
//     const text = `${title}`;
//     const url = window.location.href;
//     const hashtags = 'RDrive, RDRIVE.ORG';
//     const twitterIntentURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
//       text
//     )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
//     window.open(twitterIntentURL);
//   };

//   const shareOnFacebook = () => {
//     window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
//   };

//   const ReportOnTelegram = () => {
//     const customUrl = `https://t.me/${siteConfig.telegram}`;
//     const currentUrl = window.location.href;
//     navigator.clipboard.writeText(currentUrl).then(() => {
//       window.open(customUrl, '_blank');
//     });
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('click', handleClickOutside);

//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   return (
//       <Menu as="div" className="relative inline-block" ref={dropdownRef}>
//         <div>
//           <Menu.Button
//             onClick={() => setIsOpen(!isOpen)}
//             className="py-1 text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white "
//           >
//             <button className="flex items-center justify-center border dark:border-gray-700 rounded-md p-2 space-x-1 text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors">
//               <IoShareSocial size={22} />
//               <span className="hidden sm:block">Share</span>
//             </button>
//           </Menu.Button>
//         </div>
//         <Transition
//           as={Fragment}
//           show={isOpen}
//           enter="transition ease-out duration-100"
//           enterFrom="transform opacity-0 scale-95"
//           enterTo="transform opacity-100 scale-100"
//           leave="transition ease-in duration-75"
//           leaveFrom="transform opacity-100 scale-100"
//           leaveTo="transform opacity-0 scale-95"
//         >
//           <Menu.Items
//             static
//             className="absolute right-0 mt-1 w-32 text-center origin-top-right rounded-md bg-white dark:bg-black border dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700"
//           >
//             <div className="px-1 py-1">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     onClick={shareOnWhatsApp}
//                     className={`${
//                       active ? 'bg-green-500 text-white' : 'text-black dark:text-white'
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   >
//                     {active ? (
//                       <FaWhatsapp className="mr-2 h-5 w-5" />
//                     ) : (
//                       <FaWhatsapp className="mr-2 h-5 w-5" />
//                     )}
//                     WhatsApp
//                   </button>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     onClick={shareOnTelegram}
//                     className={`${
//                       active ? 'bg-blue-500 text-white' : 'text-black dark:text-white'
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   >
//                     {active ? (
//                       <FaTelegram className="mr-2 h-5 w-5" />
//                     ) : (
//                       <FaTelegram className="mr-2 h-5 w-5" />
//                     )}
//                     Telegram
//                   </button>
//                 )}
//               </Menu.Item>
//             </div>
//             <div className="px-1 py-1">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     onClick={shareOnTwitter}
//                     className={`${
//                       active ? 'bg-blue-400 text-white' : 'text-black dark:text-white'
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   >
//                     {active ? (
//                       <FaTwitter className="mr-2 h-5 w-5" />
//                     ) : (
//                       <FaTwitter className="mr-2 h-5 w-5" />
//                     )}
//                     Twitter
//                   </button>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     onClick={shareOnFacebook}
//                     className={`${
//                       active ? 'bg-blue-800 text-white' : 'text-black dark:text-white'
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   >
//                     {active ? (
//                       <FaFacebook className="mr-2 h-5 w-5" />
//                     ) : (
//                       <FaFacebook className="mr-2 h-5 w-5" />
//                     )}
//                     Facebook
//                   </button>
//                 )}
//               </Menu.Item>
//             </div>
//             <div className="px-1 py-1">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     onClick={ReportOnTelegram}
//                     className={`${
//                       active ? 'bg-red-600 text-white' : 'text-black dark:text-white'
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   >
//                     {active ? (
//                       <GoReport className="mr-2 h-5 w-5" />
//                     ) : (
//                       <GoReport className="mr-2 h-5 w-5" />
//                     )}
//                     Report
//                   </button>
//                 )}
//               </Menu.Item>
//             </div>
//           </Menu.Items>
//         </Transition>
//       </Menu>

//   );
// }

import { FaWhatsapp, FaTelegram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { GoReport } from 'react-icons/go';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import siteConfig from '../config/site.config';
import { IoShareSocial } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector, RootState } from '../redux/store';
import  { setIsOpen, setUrl } from '../redux/features/shareSlice';

export default function Share() {
  const dispatch = useAppDispatch();
    const { query, asPath } = useRouter()
    const title = (query.path && Array.isArray(query.path) ? query.path[query.path.length - 1] : '').replaceAll('-', ' ').replaceAll('_', ' ');
    const isOpen = useAppSelector((state:RootState) => state.share.isOpen);
    const url = useAppSelector((state:RootState) => state.share.url);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`);
  };

  const shareOnTelegram = () => {
    window.open(`https://telegram.me/share/url?url=${encodeURIComponent(window.location.href)}`);
  };

  const shareOnTwitter = () => {
    const text = `${title}`;
    const url = window.location.href;
    const hashtags = 'RDrive, RDRIVE.ORG';
    const twitterIntentURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
    window.open(twitterIntentURL);
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
  };

  const ReportOnTelegram = () => {
    const customUrl = `https://t.me/${siteConfig.telegram}`;
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      window.open(customUrl, '_blank');
    });
  };

  const toggleDropdown = () => {
    dispatch(setIsOpen(!isOpen));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    dispatch(setUrl(window.location.href));
  }, []);
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  

  return (
      <Menu as="div" className="relative inline-block" ref={dropdownRef}>
        <div>
          <Menu.Button
            onClick={() => setIsOpen(!isOpen)}
            className="py-1 text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white "
          >
            <button className="flex items-center justify-center border dark:border-gray-700 rounded-md p-2 space-x-1 text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors">
              <IoShareSocial size={20} />
              <span>Report</span>
            </button>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          show={isOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="absolute right-0 mt-1 w-32 text-center origin-top-right rounded-md bg-white dark:bg-black border dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700"
          >
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={shareOnWhatsApp}
                    className={`${
                      active ? 'bg-green-500 text-white' : 'text-black dark:text-white'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <FaWhatsapp className="mr-2 h-5 w-5" />
                    ) : (
                      <FaWhatsapp className="mr-2 h-5 w-5" />
                    )}
                    WhatsApp
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={shareOnTelegram}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-black dark:text-white'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <FaTelegram className="mr-2 h-5 w-5" />
                    ) : (
                      <FaTelegram className="mr-2 h-5 w-5" />
                    )}
                    Telegram
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={shareOnTwitter}
                    className={`${
                      active ? 'bg-blue-400 text-white' : 'text-black dark:text-white'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <FaTwitter className="mr-2 h-5 w-5" />
                    ) : (
                      <FaTwitter className="mr-2 h-5 w-5" />
                    )}
                    Twitter
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={shareOnFacebook}
                    className={`${
                      active ? 'bg-blue-800 text-white' : 'text-black dark:text-white'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <FaFacebook className="mr-2 h-5 w-5" />
                    ) : (
                      <FaFacebook className="mr-2 h-5 w-5" />
                    )}
                    Facebook
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={ReportOnTelegram}
                    className={`${
                      active ? 'bg-red-600 text-white' : 'text-black dark:text-white'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <GoReport className="mr-2 h-5 w-5" />
                    ) : (
                      <GoReport className="mr-2 h-5 w-5" />
                    )}
                    Report
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

  );
}
