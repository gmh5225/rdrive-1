import React from 'react';

export function SearchItemSkeleton() {
  return (
    <div className="flex items-center space-x-4 border-b border-gray-400/30 px-4 py-1.5 animate-pulse">
      <div className="w-6 h-6 bg-gray-300 rounded-md" />
      <div>
        <div className="w-40 h-4 bg-gray-300 rounded" />
        <div className='flex mt-1 space-x-2'>
        <div className="w-16 h-3 bg-gray-300 rounded" />
        <div className="w-20 h-3 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SearchSkeleton() {
  const randomLength = Math.floor(Math.random() * 6) + 1;
  return Array.from(Array(randomLength).keys()).map((index) => (
    <SearchItemSkeleton key={index} />
  ));
}

