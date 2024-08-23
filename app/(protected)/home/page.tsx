import { auth } from '@/auth'
import React from 'react'

const Home = async () => {
  const session = await auth() 
  console.log(session?.user)
  return (
    <div>Home
      <p>{session?.user?.name}</p>
    </div>
  )
}

export default Home