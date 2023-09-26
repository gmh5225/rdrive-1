import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);
dayjs.locale('en');

export const humanFileSize = (size: number) => {
  if (size < 1024) return size + ' B';
  const i = Math.floor(Math.log(size) / Math.log(1024));
  const num = size / Math.pow(1024, i);
  const round = Math.round(num);
  const formatted = round < 10 ? num.toFixed(2) : round < 100 ? num.toFixed(1) : round;
  return `${formatted} ${'KMGTPEZY'[i - 1]}B`;
};

export const formatDate = (lastModifiedDateTime: string) => {
  const now = dayjs();
  const lastModified = dayjs(lastModifiedDateTime);
  const diffInDays = now.diff(lastModified, 'day');
  
  // Use the relativeTime plugin to get the relative time string
  const relativeTimeStr = lastModified.fromNow();

  return relativeTimeStr;
};

export const formatNumber = (number: number) => {
  if (number >= 1e12) {
    // Trillion or more
    const formatted = (number / 1e12).toFixed(1);
    return `${formatted}T`;
  } else if (number >= 1e9) {
    // Billion or more
    const formatted = (number / 1e9).toFixed(1);
    return `${formatted}B`;
  } else if (number >= 1e6) {
    // Million or more
    const formatted = (number / 1e6).toFixed(1);
    return `${formatted}M`;
  } else if (number >= 1000) {
    // Thousand or more
    const formatted = (number / 1000).toFixed(1);
    return `${formatted}K`;
  } else {
    return number.toString();
  }
};
