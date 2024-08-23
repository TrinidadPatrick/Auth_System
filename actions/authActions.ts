"use server"
import { LoginSchema, SignupSchema } from "@/Schemas"
import { signIn, signOut } from "@/auth"
import { getUserByEmail } from "@/datas/userData"
import Bcrypt from 'bcryptjs'
import { db } from "@/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { NextApiResponse } from "next"
import { NextResponse } from "next/server"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"


export const loginWithGithub = async () => {
  await signIn("github", {redirectTo: "/home"})
  revalidatePath("/home")
}

export const loginWithGoogle = async () => {
  console.log("Hello")
  await signIn("google", {redirectTo: "/home"})
  revalidatePath("/home")
}

export const logout = async () => {
    await signOut({redirectTo: "/login"})
    revalidatePath("/login")
}

export const LoginWithCredentials = async (data : z.infer<typeof LoginSchema>) => {
   const validatedData = LoginSchema.safeParse(data)

   //Meaning data is valid
   if (validatedData.success) {
      const {email, password} = validatedData.data
      try {
        await signIn("credentials", {
          email : email.toLowerCase(),
          password,
          redirect: false,
        })

        redirect("/home") 
      } catch (error) {
        if(error instanceof AuthError){
          switch (error.type) {
              case "CredentialsSignin":
                  return {error : "Invalid Credentials", status : 401}
              case "CallbackRouteError":
                  return {error : "Invalid username or password", status : 401}
              default:
                  return {error : "Unknown Errors"}
          }
      }
      }
   }
}

export const signupWithCredentials = async (data : z.infer<typeof SignupSchema>) => {
   const validatedData = SignupSchema.safeParse(data)

   //Meaning data is valid
   if (validatedData.success) {
      const {email, password, name} = validatedData.data

      const existingUser = await getUserByEmail(email.toLowerCase())

     //If user exists
     if(existingUser) {
        return {message: "Email already exists"}
     }

     //If user doesn't exist
     const hashedPassword = await Bcrypt.hash(password, 10)
     const newUser = await db.user.create({data: {name,email : email.toLowerCase(), password : hashedPassword}})
     try {
      await signIn("credentials", {
        email : email.toLowerCase(),
        password,
        redirect: false,
      })

      redirect("/home") 
    } catch (error) {
      if(error instanceof AuthError){
        switch (error.type) {
            case "CredentialsSignin":
                return {error : "Invalid Credentials", status : 401}
            case "CallbackRouteError":
                return {error : "Invalid username or password", status : 401}
            default:
                return {error : "Unknown Errors"}
        }
    }
    }
   }
}