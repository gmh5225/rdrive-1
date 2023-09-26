import { Provider } from 'react-redux'
import {store} from '../redux/store'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/globals.css'
import '../styles/markdown-github.css'
import 'react-tippy/dist/tippy.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google'
const font = Inter({subsets: ['latin']})

// Require had to be used to prevent SSR failure in Next.js
// Related discussion: https://github.com/FortAwesome/Font-Awesome/issues/19348
const { library, config } = require('@fortawesome/fontawesome-svg-core')
config.autoAddCss = false

import {
  faFileImage,
  faFilePdf,
  faFileWord,
  faFilePowerpoint,
  faFileExcel,
  faFileAudio,
  faFileVideo,
  faFileArchive,
  faFileCode,
  faFileAlt,
  faFile,
  faFolder,
  faCopy,
  faArrowAltCircleDown,
  faTrashAlt,
  faEnvelope,
  faFlag,
  faCheckCircle,
} from '@fortawesome/free-regular-svg-icons'
import {
  faSearch,
  faTimes,
  faPen,
  faCheck,
  faPlus,
  faMinus,
  faCopy as faCopySolid,
  faAngleRight,
  faDownload,
  faMusic,
  faArrowLeft,
  faArrowRight,
  faFileDownload,
  faUndo,
  faBook,
  faKey,
  faSignOutAlt,
  faCloud,
  faChevronCircleDown,
  faChevronDown,
  faLink,
  faExternalLinkAlt,
  faExclamationCircle,
  faExclamationTriangle,
  faTh,
  faThLarge,
  faThList,
  faHome,
  faLanguage,
} from '@fortawesome/free-solid-svg-icons'
import * as Icons from '@fortawesome/free-brands-svg-icons'

import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { appWithTranslation } from 'next-i18next'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes';

// import all brand icons with tree-shaking so all icons can be referenced in the app
const iconList = Object.keys(Icons)
  .filter(k => k !== 'fab' && k !== 'prefix')
  .map(icon => Icons[icon])

library.add(
  faFileImage,
  faFilePdf,
  faFileWord,
  faFilePowerpoint,
  faFileExcel,
  faFileAudio,
  faFileVideo,
  faFileArchive,
  faFileCode,
  faFileAlt,
  faFile,
  faFlag,
  faFolder,
  faMusic,
  faArrowLeft,
  faArrowRight,
  faAngleRight,
  faFileDownload,
  faCopy,
  faCopySolid,
  faPlus,
  faMinus,
  faDownload,
  faLink,
  faUndo,
  faBook,
  faArrowAltCircleDown,
  faKey,
  faTrashAlt,
  faSignOutAlt,
  faEnvelope,
  faCloud,
  faChevronCircleDown,
  faExternalLinkAlt,
  faExclamationCircle,
  faExclamationTriangle,
  faHome,
  faCheck,
  faCheckCircle,
  faSearch,
  faChevronDown,
  faTh,
  faThLarge,
  faThList,
  faLanguage,
  faPen,
  faTimes,
  ...iconList
)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextUIProvider>
      <ThemeProvider attribute="class">
        <main className={font.className}>
          <NextNProgress color="#A020F0" startPosition={0.1} stopDelayMs={200} height={3} showOnShallow={true} options={{ showSpinner: false }} />
          <Component {...pageProps} />
          <Analytics />
        </main>
      </ThemeProvider>
      </NextUIProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp)