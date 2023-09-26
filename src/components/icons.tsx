import Image from "next/image";
import siteConfig from "../config/site.config";
import { IconSvgProps } from "../types";

export function Slash() {
    return (
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-black/70 dark:text-white/70 hover:text-black hover:dark:text-white h-8 w-8 hidden sm:block" viewBox="0 0 24 24"><path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M9.3 19H7L14.7 5H17L9.3 19Z" /></svg>
    );
  }
export function Eye() {
        return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="fill-current"><path d="m11.28 3.023-.52.06c-1.456.168-2.941.699-4.364 1.56C4.219 5.96 2.112 8.168.541 10.78.098 11.518.02 11.699.02 12c0 .301.078.482.521 1.22a19.251 19.251 0 0 0 3.037 3.882c1.004 1.003 1.797 1.638 2.818 2.255 1.414.856 2.781 1.347 4.364 1.568.564.079 2.022.068 2.62-.019 2.039-.299 3.91-1.15 5.74-2.611.608-.485 1.895-1.75 2.397-2.355.925-1.116 1.903-2.547 2.335-3.419A.955.955 0 0 0 23.98 12a.955.955 0 0 0-.128-.521c-.433-.873-1.412-2.307-2.336-3.419-.507-.611-1.792-1.874-2.396-2.356-1.829-1.458-3.723-2.32-5.72-2.605-.434-.061-1.815-.111-2.12-.076m1.64 2.035c2.798.338 5.42 2.078 7.732 5.131.279.369.941 1.353 1.13 1.681.09.155.117.096-.448.961-1.647 2.522-3.802 4.495-5.93 5.431-2.455 1.079-5.064.963-7.484-.332-1.594-.853-3.183-2.286-4.577-4.126-.291-.384-1.022-1.471-1.14-1.696-.07-.133-.076-.122.447-.918 1.501-2.286 3.373-4.105 5.27-5.12 1.607-.86 3.344-1.212 5-1.012m-1.61 3.005a3.918 3.918 0 0 0-2.131 1.116 3.903 3.903 0 0 0-1.165 3.001c.096 1.833 1.332 3.307 3.126 3.725.464.109 1.319.102 1.78-.014a4.03 4.03 0 0 0 2.971-2.971c.116-.461.123-1.316.014-1.78-.49-2.102-2.51-3.454-4.595-3.077m1.098 1.981C13.31 10.232 14 11.08 14 12c0 1.08-.92 2-2 2s-2-.92-2-2c0-.898.657-1.731 1.534-1.943.263-.064.604-.069.874-.013" fill-rule="evenodd" stroke="none"/></svg>
        );
      }
export function X() {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-black/70 dark:text-white/70 hover:text-black hover:dark:text-white h-5 w-5" viewBox="0 0 24 24" version="1.1">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
         </svg>
        );
      }
export function Logo() {
        return (
          <Image src={siteConfig.icon} alt="icon" width={40} height={40} />
        );
}
export function UserLink() {
  return (
    <svg className="text-black/70 dark:text-white/70 hover:text-black hover:dark:text-white h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
  </svg>
  );
}
export function Location() {
  return (
    <svg className="text-black/70 dark:text-white/70 hover:text-black hover:dark:text-white h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
    <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
  </svg>
  );
}
export function Star() {
  return (
    <svg className="w-5 h-5 text-[#C0C0C0]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
  </svg>
  );
}
export function Folder() {
  return (
    <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    <path d="M18 5H0v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5Zm-7.258-2L9.092.8a2.009 2.009 0 0 0-1.6-.8H2.049a2 2 0 0 0-2 2v1h10.693Z"/>
  </svg>
  );
}
    

export const HeartFilledIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden="true"
		focusable="false"
		height={size || height}
		role="presentation"
		viewBox="0 0 24 24"
		width={size || width}
		{...props}
	>
		<path
			d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
			fill="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
	</svg>
);

export function GitHub() {
  return (
    <svg className="w-5 h-5 text-black/70 dark:text-white/70 hover:text-black hover:dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
  </svg>
  );
}
export function YouTube() {
  return (
    <svg className="w-5 h-5 text-black/70 dark:text-white/70 hover:text-black hover:dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
    <path fill-rule="evenodd" d="M19.7 3.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.84c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.84A4.225 4.225 0 0 0 .3 3.038a30.148 30.148 0 0 0-.2 3.206v1.5c.01 1.071.076 2.142.2 3.206.094.712.363 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.15 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965c.124-1.064.19-2.135.2-3.206V6.243a30.672 30.672 0 0 0-.202-3.206ZM8.008 9.59V3.97l5.4 2.819-5.4 2.8Z" clip-rule="evenodd"/>
  </svg>
  );
}