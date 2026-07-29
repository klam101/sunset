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

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null)

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof authFormSchema>) {
    console.log(values)
  }

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
      ): (
        <Card className="!px-2 w-full sm:max-w-md border-0 ring-0 shadow-none">
          <CardContent>
            <form id="auth-form" onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
              <FieldGroup className="gap-4">
                {type === "sign-up" && (
                  <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
                )}

                <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
                <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />

                {type === "sign-up" && (
                  <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
                )}
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="border-0 pt-0">
            <Field orientation="horizontal">
              <Button type="submit" className="form-btn" form="auth-form" onSubmit={form.handleSubmit(onSubmit)} >
                Submit
              </Button>
            </Field>
          </CardFooter>
        </Card>
      )}
    </section>
  )
}

export default AuthForm