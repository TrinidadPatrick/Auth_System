"use client"

import React, { useState } from 'react'
import * as z from 'zod'
import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from '../ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { SignupSchema } from '@/Schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signupWithCredentials } from '@/actions/authActions'
import { FormHeader } from '../FormHeader'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'
import { FormError } from '../FormError'
import Link from 'next/link'
import LoginWithGithubButton from '../LoginWithGithubButton'
import LoginWithGoogleButton from '../LoginWithGoogleButton'
import { useRouter } from 'next/navigation'
import Loader from '../Loader'

const SignupForm = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    })

    const togglePasswordVisibility = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setShowPassword(!showPassword)
        }

    const handleSubmit = async (data: z.infer<typeof SignupSchema>) => {
        setIsLoading(true)
        try {
            const response : any = await signupWithCredentials(data)
            console.log(response)
            if(response && response.message == 'Email already exists')
            {
                setErrorMessage("Email already exists")
                return
            }
            window.location.reload()
        } catch (error) {
            console.log(error)
            setErrorMessage("Something went wrong, please try again later")
        } finally {
            setIsLoading(false) 
        }
    }

  return (
    <div className='px-10 flex flex-col justify-center w-screen semiSm:w-[450px] h-full '>
        <FormHeader title='Sign Up' paragraph='Please enter your name, email and password' />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-3'>
                <div className='flex gap-2'>
                <FormField 
                name='name'
                control={form.control}
                render={({ field }) => <FormItem>
                    <FormLabel className='text-xs'>Name</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Enter name" type="text" />
                        </FormControl>
                    <FormMessage />
                </FormItem>}
                />
                <FormField 
                name='email'
                control={form.control}
                render={({ field }) => <FormItem>
                    <FormLabel className='text-xs'>Email</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Enter email" type="email" />
                        </FormControl>
                    <FormMessage />
                </FormItem>}
                />
                </div>
                <FormField 
                name='password'
                control={form.control}
                render={({ field }) => <FormItem>
                    <FormLabel className='text-xs'>Password</FormLabel>
                        <FormControl >
                            <div className='relative'>
                                <Button onClick={(e)=>togglePasswordVisibility(e)} className='p-0 absolute right-1 bg-transparent hover:bg-transparent shadow-none'>
                                    {
                                        showPassword ? <FaEye color="black" /> : <FaRegEyeSlash color="black" />
                                    }
                                </Button>
                                <Input {...field} placeholder="Enter password" type={showPassword ? "text" : "password"} />
                            </div>
                            
                        </FormControl>
                    <FormMessage />
                    
                </FormItem>}
                />
                {/* Error message for invalid credentials or existing email */}
                <FormError errorMessage={errorMessage} />
                </div>
                <Button type="submit" className="w-full bg-gray-800 rounded">
                    <Loader isLoading={isLoading} text='Sign Up' />
                </Button>
            </form>
        </Form>
        <div className='flex justify-center mt-2'>
            <p className='text-xs'>Already have an account? <Link href="/login" className='text-xs text-gray-500 font-medium'>Sign in</Link></p>
        </div>
        <div className='flex gap-3 items-center mt-2'>
            <div className='w-full h-[1.5px] bg-gray-300'></div>
            <p className='text-center text-sm'>or</p>
            <div className='w-full h-[1.5px] bg-gray-300'></div>
        </div>
        <div className='mt-3 flex flex-col justify-between gap-2'>
          <LoginWithGithubButton />
          <LoginWithGoogleButton />
        </div>
        
    </div>
  )
}

export default SignupForm