// just demo purpose for now 
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface CommentCardProps {
  username: string;
  avatarUrl: string;
  comment: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ username, avatarUrl, comment }) => {
  return (
    <main className="max-w-3xl mx-auto">
      {/* Comment */}
      <div className="flex p-4 border-b border-gray-300">
        <div className="mr-4">
          <img className="w-10 h-10 rounded-full" src={avatarUrl} alt={`${username}'s Avatar`} />
        </div>
        <div className="flex-grow">
          <div className="flex items-center mb-2">
            <FaUserCircle className="w-5 h-5 text-gray-500 mr-1" />
            <p className="font-semibold text-gray-700">{username}</p>
          </div>
          <p className="text-gray-800">{comment}</p>
        </div>
      </div>

      {/* Leave Comment */}
      <div className="border-t border-b border-gray-300 p-4">
        <div className="flex items-center space-x-2">
          <FaUserCircle className="w-6 h-6 text-gray-500" />
          <p className="text-sm text-gray-500">Leave a comment</p>
        </div>
        <textarea
          className="w-full p-2 border rounded-lg mt-2 focus:ring focus:ring-blue-300"
          rows={4}
          placeholder="Write a comment..."
        />
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
          Comment
        </button>
      </div>

      {/* Not Logged In */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Sign up for free to join this conversation on GitHub. Already have an account? Sign in to comment.
      </div>
    </main>
  );
};

export default CommentCard;
