import { Trans } from 'next-i18next'
import siteConfig  from '../config/site.config'
import {Img} from 'react-image'

const FourOhFour: React.FC<{ errorMsg: string }> = ({ errorMsg }) => {
  return (
    <div >
      <div className="mx-auto">
      <Img
      className="mx-auto animate-pulse"
      src="/hold-on-baby.png"
      alt="Hold on baby . . ."
      width={300}
      height={250}
    />
      </div>
      <div className="mx-auto max-w-xl text-black dark:text-white">
        <div className="mb-4 text-center text-xl font-bold">
          <Trans>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Hold on baby . . .
          </Trans>
        </div>
        <h1 className='mb-8 text-center'>No response from server. Will retry in 10 seconds.</h1>
        <div className="mb-4 overflow-hidden break-all rounded-lg border dark:border-gray-700 bg-gray-50 p-2 font-mono text-xs dark:bg-black">
          {errorMsg}
        </div>
        <div className="text-sm">
          <Trans>
            Press{' '}
            <kbd className="rounded-lg border border-gray-400/20 bg-gray-100 px-1 font-mono text-xs dark:bg-black">
              F12
            </kbd>{' '}
            and open devtools for more details, or seek help at{' '}
            <a
              className="text-blue-600 hover:text-blue-700 hover:underline"
              href={`https://t.me/${siteConfig.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.title} Team
            </a>
            .
          </Trans>
        </div>
      </div>
    </div>
  )
}

export default FourOhFour
