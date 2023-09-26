import { useTheme as useNextTheme } from 'next-themes';
import { useCookies } from 'react-cookie';

export const useTheme = () => {
  const { theme, setTheme } = useNextTheme();
  const [cookies, setCookie] = useCookies(['theme']);

  const activeTheme = cookies.theme || theme;

  const setThemeWithCookie = (selectedTheme: string) => {
    setTheme(selectedTheme);
    setCookie('theme', selectedTheme, { path: '/' });
  };

  return { activeTheme, setTheme: setThemeWithCookie };
};
