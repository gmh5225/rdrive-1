import { Tooltip } from '@nextui-org/react';

const Hover = ({ tipChildren, children }) => {
  return (
    <Tooltip 
      content={tipChildren} 
      showArrow
      offset={20} 
      shadow='lg'
      classNames={{
      base: "py-2 px-4 bg-gradient-to-b from-black to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-black overflow-hidden",
      arrow: "bg-gradient-to-b from-black to-gray-800 dark:from-white dark:to-gray-100",
    }}
    >
      {children}
    </Tooltip>
  );
};

export default Hover;
