// import type { OdFileObject } from '../../types'
// import { FC, useEffect, useRef, useState } from 'react'

// import ReactAudioPlayer from 'react-audio-player'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useTranslation } from 'next-i18next'
// import { useRouter } from 'next/router'
// import {Img} from 'react-image'

// import { PreviewContainer } from './Containers'
// import { LoadingIcon } from '../Loading'
// import { formatDate } from '../../utils/fileDetails'
// import { getStoredToken } from '../../utils/protectedRouteHandler'
// import ShareReport from '../ShareReport'


// enum PlayerState {
//   Loading,
//   Ready,
//   Playing,
//   Paused,
// }

// const AudioPreview: FC<{ file: OdFileObject }> = ({ file }) => {
//   const { t } = useTranslation()
//   const { asPath } = useRouter()
//   const hashedToken = getStoredToken(asPath)

//   const rapRef = useRef<ReactAudioPlayer>(null)
//   const [playerStatus, setPlayerStatus] = useState(PlayerState.Loading)
//   const [playerVolume, setPlayerVolume] = useState(1)

//   // Render audio thumbnail, and also check for broken thumbnails
//   const thumbnail = `/api/thumbnail/?path=${asPath}&size=medium${hashedToken ? `&odpt=${hashedToken}` : ''}`
//   const [brokenThumbnail, setBrokenThumbnail] = useState(false)

//   useEffect(() => {
//     // Manually get the HTML audio element and set onplaying event.
//     // - As the default event callbacks provided by the React component does not guarantee playing state to be set
//     // - properly when the user seeks through the timeline or the audio is buffered.
//     const rap = rapRef.current?.audioEl.current
//     if (rap) {
//       rap.oncanplay = () => setPlayerStatus(PlayerState.Ready)
//       rap.onended = () => setPlayerStatus(PlayerState.Paused)
//       rap.onpause = () => setPlayerStatus(PlayerState.Paused)
//       rap.onplay = () => setPlayerStatus(PlayerState.Playing)
//       rap.onplaying = () => setPlayerStatus(PlayerState.Playing)
//       rap.onseeking = () => setPlayerStatus(PlayerState.Loading)
//       rap.onwaiting = () => setPlayerStatus(PlayerState.Loading)
//       rap.onerror = () => setPlayerStatus(PlayerState.Paused)
//       rap.onvolumechange = () => setPlayerVolume(rap.volume)
//     }
//   }, [])

//   return (
//     <>
//       <PreviewContainer>
//         <div className="flex flex-col space-y-4 md:flex-row md:space-x-4">
//           <div className="relative flex aspect-square w-full items-center justify-center rounded-lg bg-gray-100 transition-all duration-75 dark:bg-gray-700 md:w-48">
//             <div
//               className={`absolute z-20 flex h-full w-full items-center justify-center transition-all duration-300 ${
//                 playerStatus === PlayerState.Loading
//                   ? 'bg-white opacity-80 dark:bg-black'
//                   : 'bg-transparent opacity-0'
//               }`}
//             >
//               <LoadingIcon className="z-10 inline-block h-5 w-5 animate-spin" />
//             </div>

//             {!brokenThumbnail ? (
//               <div className="absolute m-4 rounded-lg-full shadow-lg">
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <Img
//                   className={`h-full w-full rounded-lg-full object-cover object-top ${
//                     playerStatus === PlayerState.Playing ? 'animate-spin-slow' : ''
//                   }`}
//                   src={thumbnail}
//                   alt={file.name}
//                   width={1}
//                   height={1}
//                   onError={() => setBrokenThumbnail(true)}
//                 />
//               </div>
//             ) : (
//               <FontAwesomeIcon
//                 className={`z-10 h-5 w-5 ${playerStatus === PlayerState.Playing ? 'animate-spin' : ''}`}
//                 icon="music"
//                 size="2x"
//               />
//             )}
//           </div>

//           <div className="flex w-full flex-col justify-between">
//             <div>
//               <div className="mb-2 font-medium">{file.name}</div>
//               <div className="mb-4 text-sm text-gray-500">
//                 {t('Upload Date:') + ' ' + formatDate(file.lastModifiedDateTime)}
//               </div>
//             </div>

//             <ReactAudioPlayer
//               className="h-11 w-full"
//               src={`/api/raw/?path=${asPath}${hashedToken ? `&odpt=${hashedToken}` : ''}`}
//               ref={rapRef}
//               controls
//               preload="auto"
//               volume={playerVolume}
//             />
//           </div>
//         </div>
//       </PreviewContainer>
//       <div className="flex flex-col items-center w-full my-2"><ShareReport /></div>
//     </>
//   )
// }

// export default AudioPreview


import type { OdFileObject } from '../../types'
import { FC, useEffect, useRef } from 'react'

import ReactAudioPlayer from 'react-audio-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {Img} from 'react-image'

import { PreviewContainer } from './Containers'
import { LoadingIcon } from '../Loading'
import { formatDate } from '../../utils/fileDetails'
import { getStoredToken } from '../../utils/protectedRouteHandler'
import ShareReport from '../ShareReport'
import { useAppDispatch, useAppSelector, RootState } from '../../redux/store';
import { setPlayerStatus, setPlayerVolume, setBrokenThumbnail } from '../../redux/features/audioPreviewSlice';

enum PlayerState {
  Loading,
  Ready,
  Playing,
  Paused,
}

const AudioPreview: FC<{ file: OdFileObject }> = ({ file }) => {
  const dispatch = useAppDispatch();
  const playerStatus = useAppSelector((state:RootState) => state.audioPreview.playerStatus);
  const playerVolume = useAppSelector((state:RootState) => state.audioPreview.playerVolume);
  const brokenThumbnail = useAppSelector((state:RootState) => state.audioPreview.brokenThumbnail);
  const { t } = useTranslation()
  const { asPath } = useRouter()
  const hashedToken = getStoredToken(asPath)
  const rapRef = useRef<ReactAudioPlayer>(null)
  // Render audio thumbnail, and also check for broken thumbnails
  const thumbnail = `/api/thumbnail/?path=${asPath}&size=medium${hashedToken ? `&odpt=${hashedToken}` : ''}`
 

  useEffect(() => {
    // Manually get the HTML audio element and set onplaying event.
    // - As the default event callbacks provided by the React component does not guarantee playing state to be set
    // - properly when the user seeks through the timeline or the audio is buffered.
    const rap = rapRef.current?.audioEl.current
    if (rap) {
      rap.oncanplay = () => dispatch(setPlayerStatus(PlayerState.Ready));
      rap.onended = () => dispatch(setPlayerStatus(PlayerState.Paused));
      rap.onpause = () => dispatch(setPlayerStatus(PlayerState.Paused));
      rap.onplay = () => dispatch(setPlayerStatus(PlayerState.Playing));
      rap.onplaying = () => dispatch(setPlayerStatus(PlayerState.Playing));
      rap.onseeking = () => dispatch(setPlayerStatus(PlayerState.Loading));
      rap.onwaiting = () => dispatch(setPlayerStatus(PlayerState.Loading));
      rap.onerror = () => dispatch(setPlayerStatus(PlayerState.Paused));
      rap.onvolumechange = () => dispatch(setPlayerVolume(rap.volume));
    }
  }, [])
  return (
    <>
      <PreviewContainer>
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4">
          <div className="relative flex aspect-square w-full items-center justify-center rounded-lg bg-gray-100 transition-all duration-75 dark:bg-gray-700 md:w-48">
            <div
              className={`absolute z-20 flex h-full w-full items-center justify-center transition-all duration-300 ${
                playerStatus === PlayerState.Loading
                  ? 'bg-white opacity-80 dark:bg-black'
                  : 'bg-transparent opacity-0'
              }`}
            >
              <LoadingIcon className="z-10 inline-block h-5 w-5 animate-spin" />
            </div>
            {!brokenThumbnail ? (
              <div className="absolute m-4 rounded-lg-full shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Img
                  className={`h-full w-full rounded-lg-full object-cover object-top ${
                    playerStatus === PlayerState.Playing ? 'animate-spin-slow' : ''
                  }`}
                  src={thumbnail}
                  alt={file.name}
                  width={1}
                  height={1}
                  onError={() => dispatch(setBrokenThumbnail(true))}
                />
              </div>
            ) : (
              <FontAwesomeIcon
                className={`z-10 h-5 w-5 ${playerStatus === PlayerState.Playing ? 'animate-spin' : ''}`}
                icon="music"
                size="2x"
              />
            )}
          </div>
          <div className="flex w-full flex-col justify-between">
            <div>
              <div className="mb-2 font-medium">{file.name}</div>
              <div className="mb-4 text-sm text-gray-500">
                {t('Upload Date:') + ' ' + formatDate(file.lastModifiedDateTime)}
              </div>
            </div>
            <ReactAudioPlayer
              className="h-11 w-full"
              src={`/api/raw/?path=${asPath}${hashedToken ? `&odpt=${hashedToken}` : ''}`}
              ref={rapRef}
              controls
              preload="auto"
              volume={playerVolume}
            />
          </div>
        </div>
      </PreviewContainer>
      <div className="flex flex-col items-center w-full my-2"><ShareReport/></div>
    </>
  );
};

export default AudioPreview;