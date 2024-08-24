import { auth } from '@/auth'
import React from 'react'

const HomePage = async () => {
  const session = await auth() 
  return (
    <div>Home
      <p>{session?.user?.name}</p>
    </div>
  )
}

export default HomePage