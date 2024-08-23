"use client"
import { signOut } from '@/auth'
import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { Button } from '../ui/button'
import { logout } from '@/actions/authActions'
 
const LogoutButton = () => {
  const handleLogout = async () => {
    await logout()
  }
  return (
    <Button onClick={handleLogout}>
      <FaSignOutAlt size={25} color='white' />
      <p className='text-white'>Logout</p>
    </Button>
  )
}

export default LogoutButton