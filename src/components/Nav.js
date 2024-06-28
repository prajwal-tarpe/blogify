import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../pages/Logout';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConf';
import { useBlogContext } from '../context/blogContext';
import LightDark from './LightDark';

function Nav() {
  const { isAuth, getUserPosts, mode } = useBlogContext();
  const [user, setUser] = useState({ displayName: "", photoURL: "" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          displayName: user.displayName,
          photoURL: user.photoURL
        });
      } else {
        setUser({ displayName: "", photoURL: "" });
      }
    });
    return () => unsubscribe();
  }, [isAuth]);

  return (
    <div className={`flex flex-wrap justify-center items-center font-bold gap-5 text-lg sm:text-2xl ${mode === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white' } p-3`}>
      <NavLink 
        to='/' 
        className='hover:text-gray-200 transition-colors duration-300'
      >
        Home
      </NavLink>
      <NavLink
        to='/about'
        className='hover:text-gray-200 transition-colors duration-300'
      >
        About
      </NavLink>

      {isAuth ? (
        <>
          <NavLink 
            to='/user' 
            className='hover:text-gray-200 transition-colors duration-300'
            onClick={() => getUserPosts(user.displayName, user.photoURL)}
          >
            User
          </NavLink>
          <NavLink 
            to='/createPost' 
            className='hover:text-gray-200 transition-colors duration-300'
          >
            Create Post
          </NavLink>
          <Logout className='hover:text-gray-200 transition-colors duration-300'/>
        </>
      ) : (
        <NavLink 
          to='/login' 
          className='hover:text-gray-200 transition-colors duration-300'
        >
          Login
        </NavLink>
      )}
      <LightDark/>
    </div>
  );
}

export default Nav;
