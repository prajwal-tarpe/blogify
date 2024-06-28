import React from 'react';
import { useBlogContext } from '../context/blogContext';

function Search() {
    const { updateFilterValue, mode } = useBlogContext();

    return (
        <form onSubmit={(e) => e.preventDefault()} className="w-full flex justify-center lg:w-auto lg:flex-grow">
            <input
                type="text"
                name="text"
                placeholder="Search"
                className={`w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none ${mode === 'light' ? 'border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white text-gray-800' : 'border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-400 focus:ring-opacity-50 bg-gray-800 text-gray-300'}`}
                onChange={updateFilterValue}
            />
        </form>
    );
}

export default Search;
