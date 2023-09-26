import axios from 'axios';
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { SWRResponse } from 'swr';
import useSWR from 'swr';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useAsync } from 'react-async-hook';
import useConstant from 'use-constant';
import { OdDriveItem, OdSearchResult } from '../types';
import { getFileIcon } from '../utils/getFileIcon';
import { fetcher } from '../utils/fetchWithSWR';
import siteConfig from '../config/site.config';
import { getConnectedAccounts } from '../utils/getConnectedAccounts';
import isHiddenFolder from '../utils/isHiddenFolder';
import { useHotkeys } from 'react-hotkeys-hook';
import { GoSearch, GoX } from 'react-icons/go';
import { formatDate, humanFileSize } from '../utils/fileDetails';
import { motion, AnimatePresence } from 'framer-motion';
import { Slash } from './icons';
import { SearchSkeleton } from './Skeleton';
import { FaFolder } from 'react-icons/fa';

function mapAbsolutePath(path: string): string {
  const absolutePath = path.split(siteConfig.baseDirectory === '/' ? 'root:' : siteConfig.baseDirectory);
  return absolutePath.length > 1
    ? absolutePath[1]
        .split('/')
        .map((p) => encodeURIComponent(decodeURIComponent(p)))
        .join('/')
    : '';
}

function useDriveItemSearch() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  const searchDriveItem = async (q: string) => {
    setIsLoading(true);

    const { data } = await axios.get<OdSearchResult>(`/api/search/?q=${q}`, {
      headers: {
        'x-connected-accounts': getConnectedAccounts(),
      },
    });

    const updatedData = data.map((item) => {
      item['path'] =
        'path' in item.parentReference
          ? `${mapAbsolutePath(item.parentReference.path)}/${encodeURIComponent(item.name)}`
          : '';
      return item;
    });

    setIsLoading(false);
    return updatedData;
  };

  const debouncedDriveItemSearch = useConstant(() => AwesomeDebouncePromise(searchDriveItem, 1000));
  const results = useAsync(async () => {
    if (query.length === 0) {
      return [];
    } else {
      return debouncedDriveItemSearch(query);
    }
  }, [query]);

  return {
    query,
    setQuery,
    isLoading,
    results,
    searchRef,
  };
}

interface SearchResultItemProps {
  driveItem: OdSearchResult[number];
  driveItemPath: string;
  itemDescription: string;
  disabled: boolean;
  setShowResults: any;
}

function SearchResultItemTemplate({ driveItem, driveItemPath, disabled, setShowResults }: SearchResultItemProps) {
  const isFile = !!driveItem.file;
  const FileIcon = isFile ? getFileIcon(driveItem.name) : FaFolder;

  const hasExtension = () => {
    const fileName = driveItem.name;
    return fileName.includes('.') && !fileName.endsWith('/');
  };

const generateLinkUrl = () => {
  const urlParts = driveItemPath.split('/');
  const fileName = urlParts[urlParts.length - 1];

  if (hasExtension()) {
    return driveItemPath.replace(fileName, `#${fileName}`);
  } else {
    return driveItemPath;
  }
};
  
  return (
    <Link
      onClick={() => {
        setShowResults(false)
      }}
      href={generateLinkUrl()}
      passHref
      className={`flex items-center space-x-4 border-b border-gray-400/30 px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-850 ${
        disabled ? 'pointer-events-none cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
       <FileIcon className='w-5 h-5'/>
       <div>
          <div className="text-sm font-medium leading-8 line-clamp-1">
                {driveItem.name.replaceAll('-', ' ')}
              </div>
              <div className="overflow-hidden font-mono text-xs opacity-60 space-x-2">
                {/* add folder size as well and folder */}
                {driveItem.size > 0 && (
                  <>
                    <span>{humanFileSize(driveItem.size)}</span>
                    <span>|</span>
                  </>
                )}
                <span>{formatDate(driveItem.lastModifiedDateTime)}</span>
                {/*counts*/}
               {/*} <span>|</span>
                {driveItem.folder ? (
                  <>
                    <span>10 Views</span>
                  </>
                ) : (
                  <>
                    <span>10 Download</span>
                  </>
                )}
                */}
          </div>
        </div>
    </Link>
  );
}


function SearchResultItemLoadRemote({ result, setShowResults }: { result: OdSearchResult[number], setShowResults : any }) {
  const { data, error }: SWRResponse<OdDriveItem, { status: number; message: any }> = useSWR(
    [`/api/item/?id=${result.id}&tokenId=${result.tokenId}`],
    fetcher
  );

  const { t } = useTranslation();

  if (error) {
    return (
      <SearchResultItemTemplate
        driveItem={result}
        driveItemPath={''}
        itemDescription={
          typeof error.message?.error === 'string' ? error.message.error : JSON.stringify(error.message)
        }
        disabled={true}
        setShowResults={setShowResults}
      />
    );
  }
  if (!data) {
    return (
      <SearchResultItemTemplate
        setShowResults={setShowResults}
        driveItem={result}
        driveItemPath={''}
        itemDescription={t('Loading ...')}
        disabled={true}
      />
    );
  }

  const driveItemPath = `${mapAbsolutePath(data.parentReference.path)}/${encodeURIComponent(data.name)}`;
  return (
    <SearchResultItemTemplate
      setShowResults={setShowResults}
      driveItem={result}
      driveItemPath={driveItemPath}
      itemDescription={decodeURIComponent(driveItemPath)}
      disabled={false}
    />
  );
}

function SearchResultItem({ result, setShowResults }: { result: OdSearchResult[number], setShowResults: any}) {
  if (result.path === '') {
    return <SearchResultItemLoadRemote result={result} setShowResults={setShowResults} />;
  } else {
    const driveItemPath = decodeURIComponent(result.path);
    return (
      <SearchResultItemTemplate
        driveItem={result}
        driveItemPath={result.path}
        itemDescription={driveItemPath}
        disabled={false}
        setShowResults={setShowResults}
      />
    );
  }
}

export function SearchBar() {
  const { query, setQuery, isLoading, results, searchRef } = useDriveItemSearch();
  const { t } = useTranslation();
  const [showResults, setShowResults] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const handleHotkey = (event) => {
    event.preventDefault();
    const searchBox = document.getElementById('search-box');
    if (searchBox) {
      searchBox.focus();
    }
  };

  const [isAnimating, setIsAnimating] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleAnimationComplete = () => {
    if (!showResults) {
      setIsAnimating(false);
    }
  };

  const handleClickOutsideResults = (event) => {
    if (resultRef.current && !resultRef.current.contains(event.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideResults);

    return () => {
      document.removeEventListener('click', handleClickOutsideResults);
    };
  }, []);

  useHotkeys('/', handleHotkey);

  return (
    <div className="w-full max-w-3xl text-sm text-black dark:text-white overflow-hidden">
      {/* Search Bar */}
      <div className={`flex h-10 items-center space-x-4 border rounded-lg p-4 ${isFocused ? 'border-pink-500' : 'border-gray-400/30'}`} ref={searchRef}>
        <GoSearch className="h-4 w-4" />
        <input
          type="text"
          id="search-box"
          className="w-full max-w-3xl text-sm bg-transparent focus:outline-none focus-visible:outline-none"
          placeholder={t('Search ...')}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onClick={() => setShowResults(true)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {!query && <Slash />}
        {query && <GoX className="h-4 w-4 cursor-pointer" onClick={() => setQuery('')} />}
      </div>
      {/* Search Results */}
      <AnimatePresence>
      {showResults && (
        <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        className="mx-auto fixed max-h-[40vh] w-auto md:w-full max-w-3xl overflow-x-hidden overflow-y-scroll search-scrollbar transform text-left shadow-xl transition-all dark:text-white bg-white dark:bg-black border border-gray-400/30 rounded-lg mt-2 inset-x-2 lg:inset-auto"
        ref={resultRef}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={handleAnimationComplete}
      >
          {isLoading || results.loading ? (
            <div>
            <SearchSkeleton />
            </div>
          ) : results.error ? (
            <div className="px-4 py-12 text-center text-sm font-medium">
              {t('Error: {{message}}', { message: results.error.message })}
            </div>
          ) : results.result && results.result.length > 0 ? (
            <>
              {results.result
                .filter((result) => !isHiddenFolder(result))
                .map((result) => <SearchResultItem key={result.id} result={result} setShowResults={setShowResults}/> )}
            </>
          ) : <div className="px-4 py-12 text-center text-sm font-medium">
                {t('Nothing here.')}
              </div>
          }
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}