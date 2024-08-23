import SideDesign from '@/components/SideDesign'
import SignupForm from '@/components/signupComponents/SignupForm'
import React from 'react'
import SignupImage from '@/assetts/SignupImage.svg'

const SignupPage = () => {
  return (
    <div className='authPage w-full h-screen flex justify-center items-center bg-slate-100'>
      <div className='flex items-center h-screen semiSm:h-fit py-4 shadow-md rounded-lg overflow-hidden bg-white'>
      <SideDesign image={SignupImage} />
      <SignupForm />
      </div>
     
    </div>
  )
}

export default SignupPage