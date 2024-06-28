import React from 'react';
import { NavLink } from 'react-router-dom';
import { useBlogContext } from '../context/blogContext';

function Footer() {
  const { mode } = useBlogContext();

  return (
    <footer className={`py-6 ${mode === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}>
      <div className='container mx-auto text-center'>
        <div className='mb-4'>
          <h2 className='font-bold text-3xl'>BLOGIFY</h2>
          <p className='text-lg font-medium mt-2'>A place where you can share your thoughts and connect with others.</p>
        </div>
        <div className='mb-4'>
          <nav className='flex justify-center space-x-6'>
            <NavLink to='/' className='hover:underline'>Home</NavLink>
            <NavLink to='/about' className='hover:underline'>About</NavLink>
            <NavLink to='/' className='hover:underline'>Blogs</NavLink>
          </nav>
        </div>
        <div className='text-sm'>
          <p>&copy; {new Date().getFullYear()} BLOGIFY All rights reserved.</p>
          <p className='mt-2'>Developed by <a href='https://yourdeveloperwebsite.com' className='hover:underline'>Prajwal Tarpe</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
