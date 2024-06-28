import React from 'react';
import { useBlogContext } from '../context/blogContext';
import CommentsSection from './CommentsSection';
import { AiOutlineDelete } from "react-icons/ai";

function Post({ id, title, postText, author }) {
  const { isAuth, deletePost, mode,userName } = useBlogContext();

  return (
    <div className={`w-full max-w-2xl p-6 mb-4 ${mode === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-gray-200'} rounded-lg shadow-md`}>
      <h2 className='text-3xl font-bold mb-2'>{title}</h2>
      <p className='text-lg my-5'>{postText}</p>
      <div className='text-sm m-2 font-semibold'>
        <h3>by: @{author}</h3>
      </div>
      {isAuth && (
        userName==author && <div className='w-1/2'>
          <button
            onClick={() => deletePost(id)}
            className={`text-2xl my-3 p-1 border-2 rounded-lg ${mode === 'light' ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-gray-300 hover:shadow-gray-400' : 'bg-gray-600 hover:bg-blue-400 text-white'} shadow-lg`}
          >
            <AiOutlineDelete />
          </button>
        </div>
      )}
      <CommentsSection postId={id} />
    </div>
  );
}

export default Post;
