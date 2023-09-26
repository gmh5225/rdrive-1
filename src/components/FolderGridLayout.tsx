import React, { useEffect, useState } from 'react';
import Link from "next/link";
import siteConfig from "../config/site.config";
import isHiddenFolder from '../utils/isHiddenFolder';
import { OdFolderChildren } from "../types";
import { ChildName } from "./FileListing";
import { Button, Card, CardBody, Chip, Divider } from '@nextui-org/react';
import { Image } from '@nextui-org/react';
import { getHeartCount, incrementHeartCount } from '../supabase/Heart';
import { HeartFilledIcon } from './icons';
import { formatNumber, humanFileSize } from '../utils/fileDetails';

const FolderGridLayout = ({ path, folderChildren }: { path: string, folderChildren: OdFolderChildren[] }) => {
  const getItemPath = (name: string) => `${path === '/' ? '' : path}/${encodeURIComponent(name)}`;
  const visibleFolderChildren = folderChildren.filter((child) => !isHiddenFolder(child) && !isHiddenFolder(child.folder));
  const [heartCounts, setHeartCounts] = useState({});
  
  useEffect(() => {
    if (Object.keys(heartCounts).length === 0) {
    fetchHeartCounts(visibleFolderChildren, setHeartCounts);
    }
    }, [visibleFolderChildren, heartCounts]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
      {visibleFolderChildren.map((child, index) => (
        <Card className="border dark:border-gray-700" key={child.id + index} isPressable isHoverable isBlurred>
          <CardBody className='p-1  overflow-hidden'>
           <div className='absolute top-0 right-0 z-20 m-1'>
           <Button
            onClick={async () => {
              await incrementHeartCount(child.id)
              setHeartCounts((counts) => ({
                ...counts,
                [child.id]: (counts[child.id] || 0) + 1,
              }))
            } }
						className="bg-white bg-opacity-70 dark:bg-opacity-50 backdrop-blur-md border dark:border-gray-700 overflow-hidden dark:bg-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-850 items-center -space-x-1 -p-2"
						startContent={<HeartFilledIcon className='h-5 w-5 text-danger'/>}
            size='sm'
            radius='full'
					>
					 <h1 className=''>{formatNumber(heartCounts[child.id] || 0)}</h1>
					</Button>
           </div>           
          <Link href={getItemPath(child.name)} passHref>
            <div className="text-black dark:text-white p-4">
              <div className="relative h-36 md:h-40 flex items-center justify-center">
                <Image
                  className="h-36 md:h-40 object-contain object-center my-10"
                  src={child.thumbnailUrl || siteConfig.noimage}
                  alt={child.name}
                  isBlurred
                  loading='lazy'
                  disableSkeleton
                />
              </div>
              <div className="flex text-center justify-center mt-2">
                <div className="truncate w-36 md:w-40 lg:w-44 xl:w-52">
                  <ChildName
                    name={child.name.replaceAll('-', ' ').replaceAll('_', ' ')}
                    folder={Boolean(child.folder)}
                  />
                </div>
              </div>
            </div>
          </Link>
          <Divider className='dark:bg-gray-700' />
          <div className="flex items-center justify-evenly mt-1.5 mb-0.5 cursor-default">
            {/*bug on child count*/}          
            <Chip className="bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-50 border dark:border-gray-700">{child.folder?.childCount ? child.folder.childCount - 1 : 0} items</Chip>  
            <Divider orientation="vertical" className='dark:bg-gray-700' />
           <Chip className="bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-50 border dark:border-gray-700">{humanFileSize(child.size)}</Chip>
          </div>
          </CardBody> 
        </Card >
      ))}
    </div>
  );
}

export default FolderGridLayout;



async function fetchHeartCounts(visibleFolderChildren, setHeartCounts) {
  const counts = {};
  for (const c of visibleFolderChildren) {
  counts[c.id] = await getHeartCount(c.id);
  }
  setHeartCounts(counts);
  }