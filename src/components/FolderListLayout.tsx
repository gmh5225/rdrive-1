import type { OdFolderChildren } from '../types'
import Link from 'next/link'
import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { humanFileSize, formatDate } from '../utils/fileDetails'
import { ChildIcon, ChildName } from './FileListing'
import isHiddenFolder from '../utils/isHiddenFolder'
import { getPreviewType } from '../utils/getPreviewType'
import { getExtension } from '../utils/getFileIcon'
import {incrementDownloadCount,  getDownloadCount} from '../supabase/Downloads'
import { RiDownloadLine } from 'react-icons/ri'
import Credit from './Cards/Credit'
import FolderCard from './Cards/FolderCard'

const FileListItem: FC<{ fileContent: OdFolderChildren; downloadCount: number }> = ({ fileContent: c, downloadCount }) => {
  const CountDisplay = ({ count, icon }) => (
    <div className="flex justify-center items-center space-x-1 cursor-pointer">
      <span>{count}</span>
      {icon}
    </div>
  );
  
  return (  

      <div className="md:grid grid-cols-11 flex md:flex-row items-center space-x-2 justify-between py-2.5 mx-2">
          <div className="col-span-12 flex items-center space-x-2 text-black dark:text-white md:col-span-6 line-clamp-3 ml-0 md:ml-2">
              <div className="w-5 flex-shrink-0 text-center">
                <ChildIcon child={c} />
              </div>
               <ChildName name={c.name.replaceAll('-', ' ').replaceAll('_', ' ')} folder={Boolean(c.folder)} />
          </div>
          <div className="col-span-3 text-center text-sm tracking-widest text-black dark:text-white md:block hidden">
              {formatDate(c.lastModifiedDateTime)}
          </div>
          <div className="text-center tracking-widest text-sm text-black dark:text-white md:block hidden">
              {humanFileSize(c.size)}
          </div>
          <div className="text-center tracking-widest text-black dark:text-white md:block">
          {c.folder ? (
            ''
              //   <CountDisplay count={downloadCount} icon={<RiEyeLine />} />
            ) : (        
                <CountDisplay count={downloadCount} icon={<RiDownloadLine />} />    
            )}
          </div>
      </div>
  )
}


const FolderListLayout = ({ path, folderChildren}) => {
  const { t } = useTranslation()
  const getItemPath = (name: string) => `${path === '/' ? '' : path}/${encodeURIComponent(name)}`
  const visibleFolderChildren = folderChildren.filter((c: OdFolderChildren) => !isHiddenFolder(c));
  const [downloadCounts, setDownloadCounts] = useState({});
  const latestModifiedDate = visibleFolderChildren.reduce((latestDate, c) => {
  const modifiedDate = new Date(c.lastModifiedDateTime);
  return modifiedDate > latestDate ? modifiedDate : latestDate;
}, new Date(0));


useEffect(() => {
  if (Object.keys(downloadCounts).length === 0) {
  fetchDownloadCounts(visibleFolderChildren, setDownloadCounts);
  }
  }, [visibleFolderChildren, downloadCounts]);

  return (
    <main>
      
    <FolderCard date={formatDate(latestModifiedDate)} />
    <div className="overflow-hidden rounded-lg border dark:border-gray-700">
    <Credit path={path} item={t('{{count}} item(s)', { count: visibleFolderChildren.length })}/>
      {visibleFolderChildren.map((c: OdFolderChildren) => (
        <div key={c.id} className='border-t dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'>

          {getPreviewType(getExtension(c.name), { video: Boolean(c.video) }) ? (
            <Link
              href={`${path === '/' ? '' : path}/${encodeURIComponent(c.name)}`}
              passHref
            >
              <FileListItem fileContent={c} downloadCount={downloadCounts[c.id] || 0} />
            </Link>
          ) : !c.folder ? (
            <Link
              href={`/api/raw/?path=${getItemPath(c.name)}`}
              target="_blank"
              onClick={async () => {
                await incrementDownloadCount(c.id)
                setDownloadCounts((counts) => ({
                  ...counts,
                  [c.id]: (counts[c.id] || 0) + 1,
                }))
              } }>
              <FileListItem fileContent={c} downloadCount={downloadCounts[c.id] || 0} />
            </Link>

          ) : (
            <Link
              href={`${path === '/' ? '' : path}/${encodeURIComponent(c.name)}`}
              passHref
            >
              <FileListItem fileContent={c} downloadCount={downloadCounts[c.id] || 0} />
            </Link>
          )}
        </div>
      ))}
    </div>
      {/* <CommentPreview />
      <Login /> */}
    </main>
  );
};

export default FolderListLayout;

async function fetchDownloadCounts(visibleFolderChildren, setDownloadCounts) {
  const counts = {};
  for (const c of visibleFolderChildren) {
  counts[c.id] = await getDownloadCount(c.id);
  }
  setDownloadCounts(counts);
  }