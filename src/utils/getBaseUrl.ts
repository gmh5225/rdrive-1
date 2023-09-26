/**
 * Extract the current web page's base url
 * @returns base url of the page
 */
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return ''
}

export function getOrigin(req: any): string{
  const { host } = req.headers;
  const protocol = /localhost/i.test(host as string) ? 'http://' : 'https://';
  return `${protocol}${host}`;
}