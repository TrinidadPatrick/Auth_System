"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/Schemas";
import { FormError } from "@/components/FormError";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form'


import { resetPassword } from "./reset-password";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

type PasswordResetFormProps = {};

export const PasswordResetForm = ({}: PasswordResetFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)

const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
        email: '',
    },
})

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    setIsLoading(true)

      resetPassword(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        setIsLoading(false)
      });
  };

  return (
    <div className="w-[400px] flex flex-col justify-center h-fit ">
      <div className="flex justify-center">
        <h1 className="text-xl font-bold ">Password reset</h1>
      </div>
      <div className="w-[400px]">
      <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-3'>
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
                {/* Error message for invalid credentials */}
                <FormError errorMessage={error} />
                
                </div>
                {
                    success && <p style={{color: 'green', backgroundColor: 'rgba(55, 245, 39, 0.12)', width: 'fit-content'}} className="p-2  text-sm ">{success}</p>
                }
                {/* Submit button */}
                <Button type="submit" className={`w-full ${isLoading ? 'bg-gray-500' : 'bg-gray-800'} rounded`}>
                    <Loader isLoading={isLoading} text='Reset Password' />
                </Button>
            </form>
        </Form>
        <Link href="/reset-password" className='text-xs text-gray-500 font-medium'>Back to login</Link>
      </div>
    </div>
  );
};
