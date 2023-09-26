import { MdReportGmailerrorred } from 'react-icons/md';
import siteConfig from '../config/site.config';
import { GoReport } from 'react-icons/go';

export default function Report() {
  const ReportOnTelegram = () => {
    const customUrl = `https://t.me/${siteConfig.telegram}`;
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      window.open(customUrl, '_blank');
    });
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={ReportOnTelegram}
        className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white p-2 rounded-full"
      >
        <MdReportGmailerrorred size={24} className="inline-block" />
      </button>
    </div>
  );
}
