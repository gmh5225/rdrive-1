import type { OdFileObject } from '../../types'
import { FC } from 'react'
import { useRouter } from 'next/router'
import { PreviewContainer } from './Containers'
import Image from '../Image';

const ImagePreview: FC<{ file: OdFileObject }> = ({ file }) => {
  const { asPath } = useRouter()

  return (
      <PreviewContainer>
      <div className="relative">
        <Image
          className="mx-auto rounded-lg"
          src={`/api/raw/?path=${asPath}`}
          alt={file.name}
          width={file.image?.width}
          height={file.image?.height}
        />
      </div>
      </PreviewContainer>
  )
}

export default ImagePreview