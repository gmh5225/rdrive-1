import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';

export function Model({ open, content }): JSX.Element {
  let [ isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <main>
        <div onClick={openModal}>{open}</div>
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
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="fixed md:relative bottom-0 md:bottom-none w-full md:max-w-md transform bg-white dark:bg-gray-850 rounded-t-2xl md:rounded-2xl p-3 shadow-xl transition-all">
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

export default Model;
