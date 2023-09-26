import { useRouter } from 'next/router'
import Description from '../../utils/description';
import { motion } from "framer-motion";
import siteConfig from '../../config/site.config';
import { FolderCardAnimation } from '../../utils/FramerMotionVariants';
import { Image } from '@nextui-org/react';
import Share from '../Share';

const FolderCard = ({date}) => {
  const { query, asPath } = useRouter();
  const fileName = (query.path && Array.isArray(query.path) ? query.path[query.path.length - 1] : '').replaceAll('-', ' ').replaceAll('_', ' ');
  const extensionIndex = fileName.lastIndexOf('.');
  const title = extensionIndex !== -1 ? fileName.slice(0, extensionIndex) : fileName;
  const description = Description();
  const URL = `/api/thumbnail/?path=${asPath}icon.png`;
  return (
    <motion.article
      variants={FolderCardAnimation}
      viewport={{ once: true }}
      className="bg-white dark:bg-black rounded-lg p-2 flex flex-col sm:flex-row items-center w-full sm:w-[99%] mx-auto gap-2 md:gap-7 border dark:border-gray-700 text-black dark:text-white mb-4"
    >
      <div className="w-full md:w-[1200px] overflow-hidden">
        <div className="relative h-52 flex items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-800 rounded-2xl transform rotate-x-20 perspective-1000 p-2 overflow-hidden">
            <Image
                  className="h-52 object-contain object-center"
                  src={URL || siteConfig.noimage}
                  alt={title}
                  isBlurred
                  loading='lazy'
                  disableSkeleton
            />
        </div>
      </div>

      <div className="flex flex-col w-full h-full px-2 mt-2 sm:mt-0 sm:p-1 md:pr-5">
        <h1 className="font-bold md:text-xl">{title}</h1>
        <p className="text-[15px] my-1">
          {description}
        </p>
        <div className="flex items-center justify-between my-2 px-1">
        <p className="text-[16px] text-gray-500 dark:text-gray-500">
          {date}
        </p>
        <Share />
      </div>
      </div>
    </motion.article>
  );
}

export default FolderCard;