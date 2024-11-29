'use client'

import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
    quantity: number

    onQuantityChanged: (quantity: number) => void
}

export const QuantitySelector = ({ quantity,  onQuantityChanged}: Props) => {


const onValueChanged = ( value: number) => {

    if( quantity + value < 1) return
    if( quantity + value > 5) return

    onQuantityChanged(quantity + value)
}
  
  
  return (
    <div className="flex ">
        <button
            onClick={() => onValueChanged(-1)}
            disabled={quantity === 1}
            className={`${quantity === 1 ? 'text-gray-400' : ''}`}
            >
            <IoRemoveCircleOutline size={30} />
            
        </button>

        <span className="w-20 mx-2 px-5 py-2 bg-gray-200 text-center rounded-md flex justify-center items-center font-bold text-md"><span>{quantity}</span></span>
        <button
            onClick={() => onValueChanged(1)}
            disabled={quantity === 5}
            className={`${quantity === 5 ? 'text-gray-400' : ''}`}
            >
            <IoAddCircleOutline size={30} />
        </button>

    </div>
  )
}