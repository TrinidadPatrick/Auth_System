import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import Credentials from 'next-auth/providers/credentials'
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Bcrypt from 'bcryptjs'
import { db } from "./db"
import { getUserByEmail } from "./datas/userData"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    providers: [Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  Credentials({
    name: "credentials",
    credentials: {
      email: { label: "Email",type: "email",placeholder: "john.doe@example.com",},
      password: {label: "Password",type: "password",},
    },
    authorize: async (credentials) => {
      if(!credentials || !credentials.email || !credentials.password) return 

      const email = credentials.email as string

      const existingUser = await getUserByEmail(email)
      if(!existingUser) 
      {
        throw new Error("User not found.")
      }
      else if(existingUser)
      {
        const validPassword = Bcrypt.compareSync(credentials.password as string, existingUser.password as string)
        if(!validPassword) {
          throw new Error("Invalid password")
        }
        return existingUser as any
      }
      throw new Error("Invalid password")
    },
    
  }),
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET
  })
],
// secret: process.env.NEXTAUTH_SECRET,
})