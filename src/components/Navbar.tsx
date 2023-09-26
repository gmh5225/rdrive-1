import Link from 'next/link'
import siteConfig from '../config/site.config'
import { SearchBar } from './SearchBar';
import Hover from './Tooltip/Tooltip';
import { FiUpload } from 'react-icons/fi';
import { Image } from '@nextui-org/react';

const Navbar = () => {
  return (
    <div className="sticky mx-auto w-full justify-center top-0 z-[100] border-b bg-white bg-opacity-70 dark:bg-opacity-70 backdrop-blur-md dark:border-gray-700 dark:bg-black select-none px-0 md:px-2">
      <div className="mx-auto flex w-full items-center my-3 px-2">
            <Link href="/" passHref>
            <Image src={siteConfig.icon} alt={siteConfig.title} width={40} height={40} isBlurred disableSkeleton />
            </Link>
        <div className="flex-grow flex justify-center ml-1">
          <SearchBar />
        </div>
        <div className="ml-2">
        <div className='border dark:border-gray-700 rounded-md py-2 px-2'>
          <Hover tipChildren="Upload">
            <Link
              href={siteConfig.upload}
              target="_blank"
              aria-label="Upload Files Here"
              className='text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white'>
              <FiUpload className="h-4 w-4" />
            </Link>
          </Hover>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
