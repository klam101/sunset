'use client';

import Link from 'next/link'
import Image from 'next/image'
import * as z from "zod"
import { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async(data: z.infer<typeof formSchema>) => {
      setLoading(true)

    try {
      //Sign up with Appwrite & create plaid token

      if (type === "sign-up") { 
        // const newUser = await signUp(data);

        // setUser(newUser)
      } else if (type === "sign-in") {
        // const response = await signIn({
        //   email: data.email,
        //   password: data.password
        // })
        // if (response) router.push("/")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Need to check validation error messages. Some of them don't make sense like postal code can't be letters.
  // Relavent files could be utils.ts with authFormSchema and CustomInput.tsx with the Controller component.
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="Sunset Logo" className="size-[3rem]" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Sunset</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24  lg:text-36 font-semibold text-gray-900">
            {user ? "Link account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user ? "Link your account to continue" : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {/* PlaidLink */}
        </div>
      ) : (
        <Card className="!px-2 w-full sm:max-w-md border-0 ring-0 shadow-none">
          <CardContent>
            <form id="auth-form" onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
              <FieldGroup className="gap-4">
                {type === "sign-up" && (
                  <>
                    <div className="flex gap-4">
                      <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Enter your first name" />
                      <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your last name" />
                    </div>
                    <CustomInput control={form.control} name="address1" label="Address" placeholder="Enter your specific address" />
                    <CustomInput control={form.control} name="city" label="City" placeholder="Enter your city" />
                    <div className="flex gap-4">
                      <CustomInput control={form.control} name="state" label="State" placeholder="ex: NY" />
                      <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="ex: 10001" />
                    </div>
                    <div className="flex gap-4">
                      <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="MM/DD/YYYY" />
                      <CustomInput control={form.control} name="ssn" label="SSN" placeholder="ex: 123-45-6789" />
                    </div>
                  </>
                )}
                <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
                <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="border-0 pt-0">
            <Field>
              <Button type="submit" disabled={isLoading} className="form-btn" form="auth-form" >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="mr-2 h-4 w-4 animate-spin" /> &nbsp; Loading...
                  </>
                ) : type === "sign-in" ? "Sign In" : "Sign Up" }
              </Button>
              <p className="flex justify-center text-14 font-normal text-gray-600">
                {type === "sign-in" ? (
                  <span>Dont have an account?&nbsp;
                    <Link href="/sign-up" className="text-blue-500">
                      Sign Up
                    </Link>
                  </span>
                ) : (
                  <span>Already have an account?&nbsp;
                    <Link href="/sign-in" className="text-blue-500">Sign In</Link></span>
                )}
              </p>
            </Field>
          </CardFooter>
        </Card>
      )}
    </section>
  )
}

export default AuthForm