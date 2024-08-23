import SideDesign from '@/components/SideDesign'
import LoginForm from '@/components/loginComponents/LoginForm'
import React from 'react'
import loginImage from '@/assetts/loginImage.svg'

const LoginPage = () => {
  return (
    <div className='authPage w-full h-screen flex justify-center items-center bg-slate-100'>
      <div className='flex items-center h-screen semiSm:h-fit py-4 shadow-md rounded-lg overflow-hidden bg-white'>
      <SideDesign image={loginImage} />
      <LoginForm />
      </div>
     
    </div>
  )
}

export default LoginPage