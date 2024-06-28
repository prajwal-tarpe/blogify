import React, { useEffect, useState } from 'react';
import { IoMdArrowUp } from "react-icons/io";

function GoToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const goToBtn = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    const listenToScroll = () => {
        const heightToHidden = 250;
        const windScroll = document.body.scrollTop || document.documentElement.scrollTop;
        if (windScroll > heightToHidden) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', listenToScroll);
        return () => {
            window.removeEventListener('scroll', listenToScroll);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <div 
                    onClick={goToBtn} 
                    className='text-3xl font-bold border-2 p-2 rounded-full w-10 h-10 flex justify-center items-center fixed bottom-5 right-5 cursor-pointer bg-white shadow-lg'
                >
                    <IoMdArrowUp />
                </div>
            )}
        </>
    );
}

export default GoToTop;
