"use client"
import { loginWithGithub } from '@/actions/authActions'
import React from 'react'
import { FaGithub } from 'react-icons/fa'

const LoginWithGithubButton = () => {

    const handleLoginWithGithub = async () => {
      const response = await loginWithGithub()
      console.log(response)
    }
  return (
    <div onClick={()=>{handleLoginWithGithub()}} className='flex w-full justify-between items-center gap-2 py-2 p-4 bg-gray-800 rounded cursor-pointer'>
        <FaGithub size={22} color='white' />
        <p className='text-white text-sm w-full text-center'>Continue with Github</p>
    </div>
  )
}

export default LoginWithGithubButton