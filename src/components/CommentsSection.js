import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConf';
import { collection, query, getDocs, addDoc, where, deleteDoc, doc } from 'firebase/firestore';
import { useBlogContext } from '../context/blogContext';
import { MdOutlineComment } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { userName, isAuth, mode } = useBlogContext();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = query(collection(db, 'dbPosts'), where('postId', '==', postId));
        const querySnapshot = await getDocs(q);
        const fetchedComments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'dbPosts'), {
        postId,
        authorName: userName,
        text: newComment,
        createdAt: new Date()
      });
      console.log('Comment added with ID: ', docRef.id);
      setNewComment('');
      setComments(prevComments => [...prevComments, {
        id: docRef.id,
        postId,
        authorName: userName,
        text: newComment,
        createdAt: new Date()
      }]);
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteDoc(doc(db, 'dbPosts', commentId));
      console.log('Comment deleted successfully');
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className={`flex flex-col max-w-2xl mx-auto p-4 ${mode === 'light' ? 'bg-white text-gray-800' : 'bg-gray-900 text-gray-200'} rounded-lg shadow-md`}>
      <h3 className='text-xl m-1 flex items-center mb-4'>
        <MdOutlineComment className='mr-2' />
        Comments
      </h3>
      <ul className='space-y-4'>
        {comments.map(comment => (
          <li key={comment.id} className={`${mode === 'light' ? 'bg-indigo-50 text-gray-800' : 'bg-gray-700 text-gray-200'} p-2 rounded-lg shadow-md`}>
            <div className='flex justify-between items-center mb-1'>
              <strong className='text-sm'>{comment.authorName}</strong>
              {comment.authorName === userName && (
                <button onClick={() => handleDelete(comment.id)} className='text-xl'>
                  <AiOutlineDelete />
                </button>
              )}
            </div>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
      {isAuth && (
        <form onSubmit={handleSubmit} className='mt-6'>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            required
            className={`w-full p-2 border ${mode === 'light' ? 'border-gray-300 bg-white text-gray-800' : 'border-gray-600 bg-gray-800 text-gray-200'} rounded-lg mb-1`}
          />
          <button
            type="submit"
            className='bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-600'
          >
            Add Comment
          </button>
        </form>
      )}
    </div>
  );
}

export default CommentsSection;
