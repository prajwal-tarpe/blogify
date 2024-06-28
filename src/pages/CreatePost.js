import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConf';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../context/blogContext';

function CreatePost() {
    const { isAuth, mode } = useBlogContext();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const postCollectionRef = collection(db, "blogPosts");

    const createPost = async () => {
        if (title.trim() === "" || postText.trim() === "") {
            alert("Please fill in all fields");
            return;
        }

        try {
            await addDoc(postCollectionRef, {
                title,
                postText,
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
            });
            navigate('/');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    useEffect(() => {
        if (!isAuth) navigate('/login');
    }, [isAuth, navigate]);

    return (
        <div className={`min-h-screen flex justify-center items-center text-2xl p-4 ${mode === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-gray-100'}`}>
            <div className={`w-full max-w-lg p-8 rounded-lg shadow-lg border-2 ${mode === 'light' ? 'bg-white text-gray-800 border-gray-300' : 'bg-gray-800 text-gray-200 border-gray-600'}`}>
                <h1 className={`text-center text-4xl font-bold mb-6 ${mode === 'light' ? 'text-blue-600' : 'text-white'}`}>Create Post</h1>
                <div className='mb-6'>
                    <label className='block text-lg font-semibold mb-2'>Title:</label>
                    <input
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 ${mode === 'light' ? 'border-gray-300 bg-white text-gray-800 focus:ring-blue-500' : 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-400'} text-lg`}
                        type='text'
                        placeholder='Enter the title...'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div className='mb-6'>
                    <label className='block text-lg font-semibold mb-2'>Post:</label>
                    <textarea
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 ${mode === 'light' ? 'border-gray-300 bg-white text-gray-800 focus:ring-blue-500' : 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-400'} text-lg h-32 resize-none`}
                        placeholder='Enter the post...'
                        onChange={(e) => setPostText(e.target.value)}
                        value={postText}
                    />
                </div>
                <button onClick={createPost} className='text-xl font-bold w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300'>
                    Submit Post
                </button>
            </div>
        </div>
    );
}

export default CreatePost;
