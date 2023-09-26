// import type { OdFileObject } from '../../types'

// import { FC, useEffect, useRef, useState } from 'react'
// import { ReactReader } from 'react-reader'
// import { useRouter } from 'next/router'
// import { useTranslation } from 'next-i18next'

// import Loading from '../Loading'
// import { getStoredToken } from '../../utils/protectedRouteHandler'
// import ShareReport from '../ShareReport'


// const EPUBPreview: FC<{ file: OdFileObject }> = ({ file }) => {
//   const { asPath } = useRouter()
//   const hashedToken = getStoredToken(asPath)

//   const [epubContainerWidth, setEpubContainerWidth] = useState(400)
//   const epubContainer = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     setEpubContainerWidth(epubContainer.current ? epubContainer.current.offsetWidth : 400)
//   }, [])

//   const [location, setLocation] = useState<string>()
//   const onLocationChange = (cfiStr: string) => setLocation(cfiStr)

//   const { t } = useTranslation()

//   // Fix for not valid epub files according to
//   // https://github.com/gerhardsletten/react-reader/issues/33#issuecomment-673964947
//   const fixEpub = rendition => {
//     const spineGet = rendition.book.spine.get.bind(rendition.book.spine)
//     rendition.book.spine.get = function (target: string) {
//       const targetStr = target as string
//       let t = spineGet(target)
//       while (t == null && targetStr.startsWith('../')) {
//         target = targetStr.substring(3)
//         t = spineGet(target)
//       }
//       return t
//     }
//   }

//   return (
//     <div>
//       <div
//         className="no-scrollbar flex w-full flex-col overflow-scroll rounded-lg bg-white dark:bg-black md:p-3"
//         style={{ maxHeight: '90vh' }}
//       >
//         <div className="no-scrollbar w-full flex-1 overflow-scroll" ref={epubContainer} style={{ minHeight: '70vh' }}>
//           <div
//             style={{
//               position: 'absolute',
//               width: epubContainerWidth,
//               height: '70vh',
//             }}
//           >
//             <ReactReader
//               url={`/api/raw/?path=${asPath}${hashedToken ? '&odpt=' + hashedToken : ''}`}
//               getRendition={rendition => fixEpub(rendition)}
//               loadingView={<Loading loadingText={t('Loading EPUB ...')} />}
//               location={location}
//               locationChanged={onLocationChange}
//               epubInitOptions={{ openAs: 'epub' }}
//               epubOptions={{ flow: 'scrolled', allowPopups: true }}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col items-center w-full my-2"><ShareReport /></div>
//     </div>
//   )
// }

// export default EPUBPreview


import type { OdFileObject } from '../../types';

import { FC, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { ReactReader } from 'react-reader';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Loading from '../Loading';
import { getStoredToken } from '../../utils/protectedRouteHandler';
import ShareReport from '../ShareReport';
import { setLocation, setEpubContainerWidth } from '../../redux/features/EPUBPreviewSlice';
import { useAppDispatch, useAppSelector, RootState} from '../../redux/store'

const EPUBPreview: FC<{ file: OdFileObject }> = ({ file }) => {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state:RootState) => state.epubPreview.location);
  const epubContainerWidth = useAppSelector((state) => state.epubPreview.epubContainerWidth);
  const epubContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setEpubContainerWidth(epubContainer.current ? epubContainer.current.offsetWidth : 400));
  }, []);

  const onLocationChange = (cfiStr: string) => dispatch(setLocation(cfiStr));

  const { t } = useTranslation();

  // Fix for not valid epub files according to
  // https://github.com/gerhardsletten/react-reader/issues/33#issuecomment-673964947
  const fixEpub = (rendition) => {
    const spineGet = rendition.book.spine.get.bind(rendition.book.spine);
    rendition.book.spine.get = function (target: string) {
      const targetStr = target as string;
      let t = spineGet(target);
      while (t == null && targetStr.startsWith('../')) {
        target = targetStr.substring(3);
        t = spineGet(target);
      }
      return t;
    };
  };

  const { asPath } = useRouter();
  const hashedToken = getStoredToken(asPath);

  return (
    <div>
      <div
        className="no-scrollbar flex w-full flex-col overflow-scroll rounded-lg bg-white dark:bg-black md:p-3"
        style={{ maxHeight: '90vh' }}
      >
        <div className="no-scrollbar w-full flex-1 overflow-scroll" ref={epubContainer} style={{ minHeight: '70vh' }}>
          <div
            style={{
              position: 'absolute',
              width: epubContainerWidth,
              height: '70vh',
            }}
          >
            <ReactReader
              url={`/api/raw/?path=${asPath}${hashedToken ? '&odpt=' + hashedToken : ''}`}
              getRendition={(rendition) => fixEpub(rendition)}
              loadingView={<Loading loadingText={t('Loading EPUB ...')} />}
              location={location}
              locationChanged={onLocationChange}
              epubInitOptions={{ openAs: 'epub' }}
              epubOptions={{ flow: 'scrolled', allowPopups: true }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full my-2">
        <ShareReport />
      </div>
    </div>
  );
};

export default EPUBPreview;
