import React from 'react';
import { useBlogContext } from '../context/blogContext';
import Post from '../components/Post';

function User() {
    const { userPosts, mode, userName, img } = useBlogContext();

    return (
        <div className={`min-h-screen p-4 ${mode==='light'?'bg-gray-100':'bg-gray-900'}`}>
            {img ? (
                <img src={img} alt={userName} className='w-24 h-24 rounded-full mx-auto'/>
            ) : (
                <div className='w-24 h-24 rounded-full mx-auto bg-gray-300'></div>
            )}
            {userName && (
                <h1 className={`text-3xl font-bold text-center mb-8 ${mode==='light'?'text-blue-600':'text-white'}`}>{userName}</h1>
            )}
            <div className='flex flex-col items-center'>
                {userPosts.map((post) => (
                    <Post key={post.id} id={post.id} title={post.title} postText={post.postText} author={post.author?.name && post.author.name}/>
                ))}
            </div>
        </div>
    );
}

export default User;
