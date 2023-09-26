import { FC, CSSProperties, ReactNode } from 'react'
import {Img} from 'react-image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import { useTranslation } from 'next-i18next'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrowNight } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import 'katex/dist/katex.min.css'

import useFileContent from '../../utils/fetchOnMount'
import FourOhFour from '../FourOhFour'
import { LoadingIcon } from '../Loading'
import ShareReport from '../ShareReport'


const MarkdownPreview: FC<{
  file: any
  path: string
  standalone?: boolean
}> = ({ file, path, standalone = true }) => {
  // The parent folder of the markdown file, which is also the relative image folder
  const parentPath = standalone ? path.substring(0, path.lastIndexOf('/')) : path

  const { response: content, error, validating } = useFileContent(`/api/raw/?path=${parentPath}/${file.name}`, path)
  const { t } = useTranslation()

  // Check if the image is relative path instead of a absolute url
  const isUrlAbsolute = (url: string | string[]) => url.indexOf('://') > 0 || url.indexOf('//') === 0
  // Custom renderer:
  const customRenderer = {
    // img: to render images in markdown with relative file paths
    image: ({
      alt,
      src,
      title,
      width,
      height,
      style,
    }: {
      alt?: string
      src?: string
      title?: string
      width?: string | number
      height?: string | number
      style?: CSSProperties
    }) => {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <div style={{ width, height }} >
          <Img
            src={`${isUrlAbsolute(src as string) ? src : `/api/?path=${parentPath}/${src}&raw=true`}`}
            title={title}
            style={style} alt={''} />
        </div>
      )
    },
    // code: to render code blocks with react-syntax-highlighter
    code({
      className,
      children,
      inline,
      ...props
    }: {
      className?: string | undefined
      children: ReactNode
      inline?: boolean
    }) {
      if (inline) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }

      const match = /language-(\w+)/.exec(className || '')
      return (
        <SyntaxHighlighter language={match ? match[1] : 'language-text'} style={tomorrowNight} PreTag="div" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    },
  }

  if (error) {
    return (
      <div className="border dark:border-gray-700 rounded-lg bg-white p-3 dark:bg-black dark:text-white">
        <FourOhFour errorMsg={error} />
      </div>
    )
  }
  if (validating) {
    return (
      <main>
        <div className="border dark:border-gray-700 rounded-lg bg-white p-3 dark:bg-black dark:text-white">
        <div className="items-center justify-center flex space-x-2">
          <LoadingIcon className="h-4 w-4 animate-spin" />
          <span>{t('Loading ...')}</span>{' '}
          </div>
        </div>
        {standalone && (
        <div className="flex flex-col items-center w-full my-2"><ShareReport /></div>
        )}
      </main>
    )
  }

  return (
    <main>
      <div className="border dark:border-gray-700 rounded-lg bg-white p-3 dark:bg-black dark:text-white">
        <div className="markdown-body">
          {/* Using rehypeRaw to render HTML inside Markdown is potentially dangerous, use under safe environments. (#18) */}
          <ReactMarkdown
            // @ts-ignore
            remarkPlugins={[remarkGfm, remarkMath]}
            // The type error is introduced by caniuse-lite upgrade.
            // Since type errors occur often in remark toolchain and the use is so common,
            // ignoring it shoudld be safe enough.
            // @ts-ignore
            rehypePlugins={[rehypeKatex, rehypeRaw]}
            components={customRenderer}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
      {standalone && (
        <div className="flex flex-col items-center w-full my-2"><ShareReport /></div>
        )}
    </main>
  )
}

export default MarkdownPreview