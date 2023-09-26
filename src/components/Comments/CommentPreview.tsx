import React from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi' 
import Image from '../Image';

const CommentPreview: React.FC = () => {
  return (
    <main className="my-4">
      <h1 className="px-4 my-1 font-semibold text-xl dark:text-white">Comments</h1>
    <div className="bg-white dark:bg-black text-black dark:text-white rounded-lg border dark:border-gray-700 overflow-hidden">
      <div className="flex items-center p-2 md:px-4 bg-gradient-to-b justify-between from-white to-gray-100 dark:from-black dark:to-gray-800 text-black dark:text-white">
        <div className="flex ">
        <Image
          className="w-10 h-10 rounded-full mr-3 bg-gray-200 dark:bg-gray-700"
          src="https://github.com/therockstarind.png"
          alt="User Avatar"
        />
        <div>
          <p className="font-semibold">Rock Star 💕</p>
          <p className="text-gray-400 text-sm ">2 hours ago</p>
        </div>
        </div>
        <div>
            {/*this is will be shown to login user*/}
        <BiDotsHorizontalRounded size={24}/>
        </div>
      </div>
      <div className='border-b dark:border-gray-700' />
      <p className="m-2 ml-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor
        felis et justo bibendum, in congue nulla luctus.
      </p>
      <div className='border-b dark:border-gray-700' />
      {/*this is will be shown to login user*/}
      <div className='p-2 px-4'>
        <div className="rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 cursor-text">
            <h1 className="ml-2 my-0.5">Write a reply</h1>
        </div>      
      </div>
    </div>
   </main>
  );
};

export default CommentPreview;
