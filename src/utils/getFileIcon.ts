import React from 'react';
import { IconBaseProps } from 'react-icons';
import { BsFiletypeGif, BsFiletypeHeic, BsFillRecordCircleFill, BsMarkdownFill } from 'react-icons/bs';
import { FaFileImage, FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileExcel, FaFileAudio, FaFileVideo, FaFileArchive, FaFileCode, FaFileAlt, FaFile, FaBook, FaLink } from 'react-icons/fa';
import { SiApple, SiJpeg } from 'react-icons/si';
import { AiFillAndroid } from 'react-icons/ai';
import { MdInstallDesktop, MdRestorePage } from 'react-icons/md'

const icons: { [key: string]: React.FC<IconBaseProps> } = {
  image: FaFileImage,
  pdf: FaFilePdf,
  word: FaFileWord,
  powerpoint: FaFilePowerpoint,
  excel: FaFileExcel,
  audio: FaFileAudio,
  video: FaFileVideo,
  archive: FaFileArchive,
  code: FaFileCode,
  text: FaFileAlt,
  file: FaFile,
  markdown: BsMarkdownFill,
  book: FaBook,
  link: FaLink,
  apple: SiApple,
  android: AiFillAndroid,
  windows: BsFillRecordCircleFill,
  recovery: MdRestorePage,
};

const extensions = {
  gif: BsFiletypeGif,
  jpeg: SiJpeg,
  jpg: FaFileImage,
  png: icons.image,
  heic: BsFiletypeHeic,
  webp: icons.image,

  pdf: icons.pdf,

  doc: icons.word,
  docx: icons.word,

  ppt: icons.powerpoint,
  pptx: icons.powerpoint,

  xls: icons.excel,
  xlsx: icons.excel,

  aac: icons.audio,
  mp3: icons.audio,
  ogg: icons.audio,
  flac: icons.audio,
  oga: icons.audio,
  opus: icons.audio,
  m4a: icons.audio,

  avi: icons.video,
  flv: icons.video,
  mkv: icons.video,
  mp4: icons.video,

  '7z': icons.archive,
  bz2: icons.archive,
  xz: icons.archive,
  wim: icons.archive,
  gz: icons.archive,
  rar: icons.archive,
  tar: icons.archive,
  zip: icons.archive,
  tgz: icons.archive,

  c: icons.code,
  cpp: icons.code,
  js: icons.code,
  jsx: icons.code,
  java: icons.code,
  sh: icons.code,
  cs: icons.code,
  py: icons.code,
  css: icons.code,
  html: icons.code,
  ts: icons.code,
  tsx: icons.code,
  rs: icons.code,
  vue: icons.code,
  json: icons.code,
  yml: icons.code,
  yaml: icons.code,
  toml: icons.code,

  txt: icons.text,
  rtf: icons.text,
  vtt: icons.text,
  srt: icons.text,
  log: icons.text,
  diff: icons.text,

  md: icons.markdown,
  mdx: icons.markdown,

  epub: icons.book,
  mobi: icons.book,
  azw3: icons.book,

  url: icons.link,

  ipsw: icons.apple,
  dmg: icons.apple,

  iso: icons.windows,
  img: icons.recovery,

  exe: MdInstallDesktop,

  apk: icons.android,
};

export function hasKey(obj: Record<string, any>, key: string): boolean {
  return key in obj;
}

export function getRawExtension(fileName: string): string {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
}

export function getExtension(fileName: string): string {
  return getRawExtension(fileName).toLowerCase();
}

export function getFileIcon(fileName: string, flags?: { video?: boolean }): React.FC<IconBaseProps> {
  const extension = getExtension(fileName);
  let icon = hasKey(extensions, extension) ? extensions[extension] : icons.file;

  if (extension === 'ts') {
    if (flags?.video) {
      icon = icons.video;
    }
  }

  return icon;
}
