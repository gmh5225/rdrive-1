// import type { OdFileObject } from '../../types'
// import { FC, useEffect, useRef, useState } from 'react'
// import { useRouter } from 'next/router'

// import Preview from 'preview-office-docs'
// import { getBaseUrl } from '../../utils/getBaseUrl'
// import { getStoredToken } from '../../utils/protectedRouteHandler'
// import ShareReport from '../ShareReport'


// const OfficePreview: FC<{ file: OdFileObject }> = ({ file }) => {
//   const { asPath } = useRouter()
//   const hashedToken = getStoredToken(asPath)

//   const docContainer = useRef<HTMLDivElement>(null)
//   const [docContainerWidth, setDocContainerWidth] = useState(600)

//   const docUrl = encodeURIComponent(
//     `${getBaseUrl()}/api/raw/?path=${asPath}${hashedToken ? `&odpt=${hashedToken}` : ''}`
//   )

//   useEffect(() => {
//     setDocContainerWidth(docContainer.current ? docContainer.current.offsetWidth : 600)
//   }, [])

//   return (
//     <div>
//       <div className="overflow-scroll" ref={docContainer} style={{ maxHeight: '90vh' }}>
//         <Preview url={docUrl} width={docContainerWidth.toString()} height="600" />
//       </div>
//         <div className="flex flex-col items-center w-full my-2"><ShareReport /></div>
//     </div>
//   )
// }

// export default OfficePreview

import type { OdFileObject } from '../../types';
import { FC, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Preview from 'preview-office-docs';
import { getBaseUrl } from '../../utils/getBaseUrl';
import { getStoredToken } from '../../utils/protectedRouteHandler';
import ShareReport from '../ShareReport';
import { useAppDispatch, useAppSelector, RootState} from '../../redux/store'
import { setDocContainerWidth } from '../../redux/features/officePreviewSlice';


const OfficePreview: FC<{ file: OdFileObject }> = ({ file }) => {
  const dispatch = useAppDispatch();
  const docContainerWidth = useAppSelector((state:RootState) => state.officePreview.docContainerWidth);
  const docContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setDocContainerWidth(docContainer.current ? docContainer.current.offsetWidth : 600));
  }, []);

  const { asPath } = useRouter();
  const hashedToken = getStoredToken(asPath);

  const docUrl = encodeURIComponent(
    `${getBaseUrl()}/api/raw/?path=${asPath}${hashedToken ? `&odpt=${hashedToken}` : ''}`
  );

  return (
    <div>
      <div className="overflow-scroll" ref={docContainer} style={{ maxHeight: '90vh' }}>
        <Preview url={docUrl} width={docContainerWidth.toString()} height="600" />
      </div>
      <div className="flex flex-col items-center w-full my-2">
        <ShareReport />
      </div>
    </div>
  );
};

export default OfficePreview;
