import * as z from 'zod'

export const SignupSchema = z.object({
  name: z.string( ).min(5, {
    message: 'Name must be at least 4 characters long',
  }),
  email: z.string().email({
    message: 'Input must be a valid email',
  }),
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    }
  ),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})