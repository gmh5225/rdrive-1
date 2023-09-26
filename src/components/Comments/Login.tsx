import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';

const Login: React.FC = () => {
  return (
    <div className="fixed bottom-8 left-0 right-0 justify-center flex">
      <button className="flex items-center py-3 px-4 md:px-6 text-sm md:text-base rounded-full font-medium shadow-md focus:outline-none 
                      bg-gradient-to-t from-gray-800 to-gray-600 text-white transition-transform hover:scale-105">
        <FaSignInAlt className="mr-2" />
        Login to Comment
      </button>
    </div>
  );
};


export default Login;
