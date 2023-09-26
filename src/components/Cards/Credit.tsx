import React from 'react';
import CreditPreview from '../previews/CreditPreview';

const Credit = ({path, item}) => {
    return (
        <main className="flex justify-between px-2 md:px-4 items-center py-1.5 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-800 text-black dark:text-white">
            <CreditPreview path={path} />
        <div className="flex space-x-2 md:space-x-4 text-sm">
            {/* <div>{view} Views</div>
            <span className="mx-1">•</span> */}
            <div className="flex items-center">{item}</div>
        </div>
        </main>
    );
}

export default Credit;
