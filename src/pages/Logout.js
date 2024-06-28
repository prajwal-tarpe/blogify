import React from 'react'
import { useBlogContext } from '../context/blogContext'

function Logout() {
    const {signOutFromGoogle} = useBlogContext();
  return (
    <button className='p-2 border-1 border-blue-200' onClick={signOutFromGoogle}>Logout</button>
  )
}

export default Logout