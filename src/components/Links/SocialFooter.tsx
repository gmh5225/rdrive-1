import siteConfig from "../../config/site.config";
import Link from "next/link";
import { GitHub, YouTube } from "../icons";

function SocialFooter() {
  const socialIcons = [
    {
      href: `${siteConfig.github}`,
      icon: <GitHub />,
    },
    {
      href: `${siteConfig.youtube}`,
      icon: <YouTube />,
    }
  ];

  return (
      <div className='flex justify-center gap-5'>
        {socialIcons.map(({ href, icon }, index) => (
          <Link href={href} target='_blank' rel='noopener noreferrer' key={index}>
              {icon}
          </Link>
        ))}
      </div>
  );
}

export default SocialFooter;
