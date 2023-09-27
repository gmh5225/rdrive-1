/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/server';
import { extensions } from '../../utils/getPreviewType';
import siteConfig from '../../config/site.config';

export const config = {
  runtime: 'edge',
};

const checkTypeAndTitle = (url: string) => {
  const cleanURL = url.split(/[?#]/)[0];
  const segments = cleanURL.split('/');
  const lastSegment = segments[segments.length - 2];
  if (lastSegment.includes('.') && !lastSegment.endsWith('.')) {
    const lastPeriodIndex = lastSegment.lastIndexOf(".");
    const fileTitle = lastSegment.slice(0, lastPeriodIndex);
    const fileExtension = lastSegment.slice(lastPeriodIndex + 1);
    if (fileExtension in extensions) {
      return { 
        type: "file",
        title: fileTitle,
        url
      }
    } else {
      return {
        type: "folder",
        title: fileTitle,
        url: cleanURL.slice(0, cleanURL.indexOf(segments[segments.length - 2]))
      }
    }
    
  }

  if (cleanURL.endsWith('/')) {
    return {
      type: "folder",
      title: segments[segments.length - 2] ,
      url
    }
  }

  return {
    type: "folder",
    title: segments[segments.length - 1]
  }
}

const font = fetch(new URL('../../../public/font/Inter.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
);

export default async function handler(req) {
  const fontData = await font;
  const { searchParams } = new URL(req.url);
  let url = searchParams.get('link') ?? '';
  const result = checkTypeAndTitle(url);
  
  let structuredUrl = `${siteConfig.domain}/api/thumbnail/?path=${result.url}`;
  if (result.type === "folder") {
    structuredUrl += "/icon.png";
  }
  const Description = (): string => { 
    let url = searchParams.get('link') ?? '';
    const path = url.toLowerCase();
    if (path.includes('apple')) {
      return `Explore ${title} Firmware and solutions for your Apple device, including guides for common issues.`;
  } else if (path.includes('pixelexperience-rom')) {
      return `Enhance your Android device with Pixel Experience custom ROMs, featuring advanced features and a sleek interface.`;
  } else if (path.includes('apps/windows')) {
      return `Upgrade your device with ${title}, complete with a step-by-step installation guide for increased productivity.`;
  } else if (path.includes('apps/mac-os')) {
      return `Download ${title} for Mac OS devices, complete with step-by-step installation guides.`;
  } else if (path.includes('apps/linux')) {
      return `Download ${title} for Linux, complete with step-by-step installation guides.`;
  } else if (path.includes('apps/android')) {
      return `Download ${title} for Android devices, complete free with step-by-step installation guides.`;
  } else if (path.includes('drivers')) {
      return `Download the latest drivers for seamless device-to-computer communication.`;
  } else if (path.includes('flash-tool')) {
      return `Effortlessly flash custom ROMs and recoveries with our powerful Flash Tool.`;
  } else if (path.includes('frp')) {
      return `Bypass Factory Reset Protection (FRP) on your device using our proven methods and guides.`;
  } else if (path.includes('icloud')) {
      return `Unlock your iCloud-locked device with our trusted methods, including bypass files and step-by-step instructions.`;
  } else if (path.includes('emmc-isp-pinout')) {
      return `Unlock your device and perform advanced tasks like file recovery and dead boot repair using the EMMC ISP Pinout method with tools like UFI and Easy Jtag.`;
  } else {
      return `Discover various resources for your ${title} device, including drivers, firmware, tools, and guides.`;
  }
  };


  const pathParts = url.split('/');
  const lastPathPart = pathParts[pathParts.length - 2].replaceAll('-',' ').replaceAll('_', ' ');
  const title = result.title.replaceAll('-',' ').replaceAll('_', ' ');
  const description = Description();

  return new ImageResponse(
    (
      <main tw="h-full w-full pb-6 flex flex-col" style={{ background: 'linear-gradient(to right, rgba(137, 43, 226, 0.3) 10%, rgba(30, 144, 255, 0.3) 30%, rgba(0, 255, 128, 0.9) 90%)' }}>
      <div tw="w-full h-full flex flex-col items-start justify-start text-zinc-100 p-8" style={{ background: 'linear-gradient(360deg, #000000, #222222)' }}>
        <div tw="w-full mt-auto flex items-start">
        <div tw="flex flex-col mt-auto max-w-2xl">
          <h1 tw="text-5xl">{lastPathPart}</h1>
          {description && <h2 tw="text-2xl text-zinc-200">{description}</h2>}
        </div>
          <img
            tw="rounded-lg h-48 ml-auto"
            src={structuredUrl}
            alt={title}
          />
        </div>
        <div tw="w-full mt-auto flex items-start justify-start">
        <div tw="flex flex-col mt-auto max-w-2xl">
              <h1 tw="text-5xl text-zinc-500">{siteConfig.footer}</h1>
            </div>
          <img
            tw="rounded-lg w-22 h-22 self-end ml-auto"
            src="https://github.com/rdriveorg.png"
            alt="RDRIVE"
          />
        </div>
      </div>
    </main>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
        },
      ],
      headers: {
        'Content-Disposition': `filename=${title}.webp`,
      },
    }
  );
}