"use client";

import { deleteUserAddress, setUserAddress } from "@/actions";
import { Address, Country } from "@/interfaces";
import { useAddressStore } from "@/store";


import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  countries: Country[]
  // Partiaal<> make all Addresses properties as optional ?
  userStoreAddress?: Partial<Address>

}

interface FormInputs {
    firstName: string
    lastName: string
    address: string
    address2?: string
    postalCode: string
    city: string
    country: string
    phone: string
    rememberAddress: boolean
}

export const AddressForm = ({ countries, userStoreAddress = {} }: Props) => {
  const router = useRouter()
  const address = useAddressStore( state => state.address)
  const setAddress = useAddressStore( state => state.setAddress)


  const { register, handleSubmit, formState: {isValid, errors}, reset } = useForm<FormInputs>({
      defaultValues: {
        ...(userStoreAddress as any),
        country: userStoreAddress.country,
        rememberAddress: false
      }
  })

  // get userId
  const { data: session } = useSession({ required: true })

  useEffect(() => {
    if(address.firstName) {
      reset(address)
    }
  }, [address, reset])

  const onSubmit = async ( data: FormInputs ) => {
      const { rememberAddress, ...rest } = data
      setAddress(rest)

      if( data.rememberAddress ) {
        await setUserAddress( rest, session!.user.id)
      } else {
        await deleteUserAddress( session!.user.id)
      }

      router.push('/checkout')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gap-2 sm:gap-5 grid grid-cols-1 sm:grid-cols-2"
    >
      <div className="flex flex-col mb-2">
        <span>Name</span>
        <input
          type="text"
          className="bg-gray-200 p-2 border rounded-md"
          {...register("firstName", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Last names</span>
        <input
          type="text"
          className="bg-gray-200 p-2 border rounded-md"
          {...register("lastName", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Address</span>
        <input
          type="text"
          className="bg-gray-200 p-2 border rounded-md"
          {...register("address", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Address 2 (optional)</span>
        <input
          type="text"
          className="bg-gray-200 p-2 border rounded-md"
          {...register("address2")}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Zip code</span>
        <input
          type="text"
          className="bg-gray-200 p-2 border rounded-md"
          {...register("postalCode", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>City</span>
        <input
          type="text"
          className="bg-gray-200 p-2 border rounded-md"
          {...register("city", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Country</span>
        <select
          className="bg-gray-200 p-2 border rounded-md"
          {...register("country", { required: true })}
        >
          <option value=""> Select </option>
          { countries.map( country => (
              <option 
                key={country.id}
                value={country.id}
              >{country.name}</option>

          ))}

        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Phone</span>
        <input
          type="text"
          className="bg-gray-200 p-2 border rounded-md"
          {...register("phone", { required: true })}
        />
      </div>

      <div className="flex flex-col sm:mt-1 mb-2">
        <div className="inline-flex items-center mb-2">
          <label
            className="relative flex items-center p-3 rounded-full cursor-pointer"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="peer before:block before:top-2/4 before:left-2/4 before:absolute relative before:bg-blue-gray-500 checked:before:bg-blue-500 checked:bg-blue-500 before:opacity-0 hover:before:opacity-10 border border-gray-500 border-blue-gray-200 checked:border-blue-500 rounded-md before:rounded-full w-5 before:w-12 h-5 before:h-12 transition-all before:transition-opacity before:-translate-x-2/4 before:-translate-y-2/4 appearance-none cursor-pointer before:content['']"
              id="checkbox"
              // checked={remeber}
              // onChange={() => setRemeber(!remeber)}
              {...register("rememberAddress") }
            />
            <div className="top-2/4 left-2/4 absolute opacity-0 peer-checked:opacity-100 text-white transition-opacity -translate-x-2/4 -translate-y-2/4 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>

          <span>Remember address</span>
        </div>

        <div className="flex flex-col sm:mt-5 mb-2">
          <button
            type="submit"
            disabled={!isValid}
            //   href="/checkout"
            // className={`disabled:opacity-50 btn-primary flex w-full sm:w-1/2 justify-center `}
            className={clsx({
                'btn-primary': isValid,
                'btn-disabled': !isValid,
            })}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};
