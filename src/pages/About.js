import React from 'react';
import { useBlogContext } from '../context/blogContext';

function About() {
  const { mode } = useBlogContext();

  return (
    <div className={`py-10 px-4 sm:px-6 lg:px-8 ${mode === 'light' ? 'bg-gray-100' : 'bg-gray-900'} min-h-screen`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-3xl font-bold text-center mb-6 ${mode === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
          Welcome to BLOGIFY
        </h1>
        <p className={`text-lg text-center leading-relaxed ${mode === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>
          At BLOGIFY, we believe in the power of words to inspire, inform, and connect. Our mission is to create a vibrant community where diverse voices come together to share their stories, ideas, and experiences. Whether you're passionate about technology, travel, lifestyle, or personal development, you'll find insightful articles crafted with care and authenticity. Join us on this journey of exploration and discovery as we explore the richness of human expression through the art of blogging. Together, let's embark on a journey of learning, growth, and connection. Welcome to our world of stories.
        </p>
      </div>
    </div>
  );
}

export default About;
