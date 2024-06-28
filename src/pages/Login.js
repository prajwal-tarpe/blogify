import React from 'react';
import { useBlogContext } from '../context/blogContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { signInWithGoogle, isAuth, mode } = useBlogContext();
    const navigate = useNavigate();

    if (isAuth) {
        navigate('/');
        return null;
    }

    return (
        <div className={`min-h-screen flex justify-center items-center ${mode === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'}`}>
            <div className={`p-8 rounded-lg shadow-lg flex flex-col items-center ${mode==='light'?'bg-white':'bg-gray-800'}`}>
                <h1 className={`text-3xl font-bold ${mode === 'light' ? 'text-blue-600' : 'text-white'} mb-8`}>Welcome to the Blog</h1>
                <button
                    className={`bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none`}
                    onClick={signInWithGoogle}
                >
                    Sign In With Google
                </button>
            </div>
        </div>
    );
}

export default Login;
