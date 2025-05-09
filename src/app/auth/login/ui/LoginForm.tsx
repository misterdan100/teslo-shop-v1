'use client'

import { authenticate, loginDemoUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined);
  
  useEffect(() => {
    if(state === 'Success') {
      // router.replace('/')
      window.location.replace('/')
    }
  }, [state])

  const handleDemoUser = async () => {
    
    const res = await loginDemoUser()

    if(res === 'Success') {
      window.location.replace('/')
      return
    }
  }
  
  return (
    <form
        action={dispatch}
        className="flex flex-col"
    >

        <label htmlFor="email">Email</label>
        <input
          className="bg-gray-200 mb-5 px-5 py-2 border rounded"
          type="email" 
          name="email"
        />


        <label htmlFor="email">Password</label>
        <input
          className="bg-gray-200 mb-5 px-5 py-2 border rounded"
          type="password"
          name="password"
        />

        

        {/* <button
          type="submit"
          className="btn-primary">
          Next
        </button> */}

        <div
        className="flex items-end space-x-1 h-8"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignIn" || state === "UnknownError"  && (
          <div className="flex flex-row mb-2">
            <IoInformationOutline className="w-5 h-5 text-red-500" />
            <p className="text-red-500 text-sm">
              Credentials not valid
            </p>
          </div>
        )}
      </div>

      <LoginButton />

      <button 
        type="button" 
        onClick={handleDemoUser}
        className='bg-blue-300 hover:bg-blue-400 mt-4 px-4 py-2 rounded text-black transition-all'
        >
        Demo User
      </button>


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-gray-500 border-t"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-gray-500 border-t"></div>
        </div>

        <Link
          href="/auth/new-account" 
          className="text-center btn-secondary">
          Create Account
        </Link>

      </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      className={ clsx({
        "btn-primary": !pending,
        "btn-disabled": pending
      })}
      disabled={ pending }
      >
      Sign in
    </button>
  );
}