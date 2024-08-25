import { auth } from '@/auth'
import React from 'react'
import LogoutButton from '../settingsComponent/LogoutButton'

const HomePage = async () => {
  const session = await auth() 
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-4'>
      <h1 className='text-3xl font-bold'>Welcome to Authify</h1>
      <p>{session?.user?.name}</p>

      <LogoutButton />
    </div>
  )
}

export default HomePage