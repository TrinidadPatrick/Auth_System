"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Suspense, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema, ResetSchema } from "@/Schemas";
import { FormError } from "@/components/FormError";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { newPassword } from "./new-passwrod";

type NewPasswordFormProps = {};

export const NewPasswordForm = ({}: NewPasswordFormProps) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)

const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
        password: '',
    },
})

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setIsLoading(true)
    setError("");
    setSuccess("");

      newPassword(values, token).then((data) => {
        if(data?.success){
            setSuccess(data?.success);
          router.push("/login")
        }
        setError(data?.error);
        setIsLoading(false)
      });
  };

  return (
    <Suspense>
    <div className="w-[400px] flex flex-col justify-center h-fit ">
      <div className="flex justify-center">
        <h1 className="text-xl font-bold ">Password reset</h1>
      </div>
      <div className="w-[400px]">
      <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-3'>
                <FormField 
                name='password'
                control={form.control}
                render={({ field }) => <FormItem>
                    <FormLabel className='text-xs'>Password</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Enter new password" type="password" />
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
      </div>
    </div>
    </Suspense>
  );
};
