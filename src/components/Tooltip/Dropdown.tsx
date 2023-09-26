import { Dialog, Transition } from '@headlessui/react';
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';

export function Dropdown({ open, content }): JSX.Element {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <main>
      <Popover offset={12}>
      <PopoverTrigger className="hidden sm:block">
      {open}
      </PopoverTrigger>
      <PopoverContent className="bg-white dark:bg-gray-850 ">
      {content}
      </PopoverContent>
    </Popover>

      {/*Model on mobile device */}
      <div onClick={openModal} className="block sm:hidden">{open}</div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="transform transition-transform ease-out duration-300"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transform transition-transform ease-in duration-200"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Dialog.Panel className="fixed bottom-0 w-full transform bg-white dark:bg-gray-850 rounded-t-2xl p-2 text-left align-middle shadow-xl transition-all">
                  <div className="overflow-y-auto"> 
                  <motion.div
                  drag="y" 
                  dragConstraints={{ top: 0, bottom: 0 }}
                  > 
                    {content}
                  </motion.div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}

export default Dropdown;
