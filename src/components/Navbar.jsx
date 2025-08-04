// import React from 'react'
// import {assets} from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import {  ArrowRight } from 'lucide-react';
// import {useClerk , useUser, UserButton} from "@clerk/clerk-react"

// const Navbar = () => {
//     const navigate=useNavigate();
//     const {user} =useUser();
//     const {openSignIn} =useClerk();
//   return (
//     <div className=' z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 '>
//         <img src={assets.logo} alt="logo" className='w-32 cursor-pointer sm:w-44'onClick={()=> navigate('/')} />

//         {
//           user ? (
//         <UserButton afterSignOutUrl='/' />
//       ) :(
//            <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>Get Started <ArrowRight className='h-4 w-4 '/></button>
//           )
//         }

//     </div>
//   )
// }

// export default Navbar;

import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn, signOut } = useClerk()

    // Callback for handling sign out and redirecting to "/"
    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    return (
        <div className="w-full fixed top-0 left-0 right-0">
        <div className='z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
            <img 
                src={assets.logo} 
                alt="logo" 
                className='w-32 sm:w-44 cursor-pointer ' 
                onClick={() => navigate('/')} 
            />
            {
                user ? (
                    <UserButton signOutCallback={handleSignOut} />
                ) : (
                    <button 
                        onClick={openSignIn} 
                        className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'
                    >
                        Get Started <ArrowRight className='w-4 h-4' />
                    </button>
                )
            }
        </div>

        </div>
    )
}

export default Navbar;