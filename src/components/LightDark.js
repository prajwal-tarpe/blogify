import React, { useState, useEffect } from 'react';
import { CiLight, CiDark } from "react-icons/ci";
import { useBlogContext } from '../context/blogContext';

function LightDark() {
  const { mode, changeMode } = useBlogContext();
  const [transitionClass, setTransitionClass] = useState('');

  useEffect(() => {
    if (mode) {
      setTransitionClass('transform transition-transform duration-300 ease-in-out rotate-180');
      setTimeout(() => {
        setTransitionClass('');
      }, 300);
    }
  }, [mode]);
  console.log(mode);

  const handleClick = () => {
    changeMode();
  };

  return (
    <button
      className='text-2xl p-1 font-bold border-2 rounded-full'
      onClick={handleClick}
    >
      {mode === 'light' ? (
        <CiLight className={`${transitionClass}`} />
      ) : (
        <CiDark/>
      )}
    </button>
  );
}

export default LightDark;