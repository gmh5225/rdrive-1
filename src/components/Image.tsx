import React from 'react';

interface ImageProps {
  src: string;
  alt?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  onError?: () => void;
}

const Image: React.FC<ImageProps> = React.memo(function Image({
  src,
  alt,
  width,
  height,
  className,
  onError,
  title,
}) {
  const handleImageError = () => {
    if (onError) {
      onError();
    }
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      title={title}
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      onError={handleImageError}
    />
  );
});

// Set the display name for the component
Image.displayName = 'Image';

export default Image;
