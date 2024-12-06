'use client'

import { authenticate, login, registerUser } from "@/actions"
import { signIn } from "@/auth.config"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import errorMap from "zod/locales/en.js"

interface FormInputs {
    name: string
    email: string
    password: string
}

export const RegisterForm = () => {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState('')
    const regex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    const { register, watch, handleSubmit, formState: {errors, } } = useForm<FormInputs>()

    const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
        setErrorMessage('')
        const resp = await registerUser(formData)

        if( !resp.ok ) {
            setErrorMessage(resp.message)
            return
        }

        console.log(resp.message)
        const respLogin = await login(formData.email.toLowerCase(), formData.password)

        if( respLogin !== 'Success' ) {
            setErrorMessage(resp.message)
            return
        }

        window.location.replace('/profile')
    }
  
  
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Full Name</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-600": errors.name,
        })}
        type="text"
        {...register("name", { required: true })}
        autoFocus
      />

      <label htmlFor="email">Email</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-600": errors.email,
        })}
        type="email"
        {...register("email", { required: true, pattern: RegExp(regex) })}
      />

      <label htmlFor="email">Password</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-1", {
          "border-red-600": errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />
      <p className="text-gray-400 text-xs italic  mb-5">
        Minimun 6 characteres
      </p>

      {Object.entries(errors).length > 0 && (
        <p className="text-red-600 text-sm fade-in mb-4 italic">
          * All fields are required
        </p>
      )}

      <button className="btn-primary">Create Account</button>

      {errorMessage && (
        <p className="text-red-600 text-md font-bold text-center fade-in mb-4 italic mt-4">
          {errorMessage}
        </p>
      )}

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Sign in
      </Link>
    </form>
  );
}