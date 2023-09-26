import React, { useEffect } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import { BsFillSunFill, BsMoon } from 'react-icons/bs';
import { RiComputerLine } from 'react-icons/ri';
import { useTheme } from '../../utils/theme';

const ThemeSwitcher: React.FC = () => {
  const { activeTheme, setTheme } = useTheme();

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };

  useEffect(() => {
    setTheme(activeTheme);
  }, [activeTheme, setTheme]);

  const tabs = [
    {
      theme: 'light',
      icon: <BsFillSunFill onClick={() => handleThemeChange('light')} />,
    },
    {
      theme: 'dark',
      icon: <BsMoon onClick={() => handleThemeChange('dark')} />,
    },
    {
      theme: 'system',
      icon: <RiComputerLine onClick={() => handleThemeChange('system')} />,
    },
  ];

  return (
    <div className="">
      <Tabs
        aria-label="DarkMode Bar"
        size="lg"
        radius="md"
        items={tabs}
        selectedKey={activeTheme}
        classNames={{
          tabList: 'bg-transparent',
          cursor: 'rounded-full bg-gradient-to-t dark:from-[#0D1117] dark:to-gray-850',
          tabContent: 'dark:group-data-[selected=true]:text-white text-black dark:text-white',
        }}
      >
        {(item) => (
          <Tab key={item.theme} title={item.icon} />
        )}
      </Tabs>
    </div>
  );
};

export default ThemeSwitcher;
