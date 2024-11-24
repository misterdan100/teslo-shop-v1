'use client'

import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
    quantity: number
}

export const QuantitySelector = ({ quantity }: Props) => {
const [count, setCount] = useState(quantity)

const onQuantityChanged = ( value: number) => {

    if( count + value < 1) return
    if( count + value > 5) return

    setCount(count + value)
}
  
  
  return (
    <div className="flex ">
        <button
            onClick={() => onQuantityChanged(-1)}
            disabled={count === 1}
            className={`${count === 1 ? 'text-gray-400' : ''}`}
            >
            <IoRemoveCircleOutline size={30} />
            
        </button>

        <span className="w-20 mx-2 px-5 py-2 bg-gray-200 text-center rounded-md flex justify-center items-center font-bold text-md"><span>{count}</span></span>
        <button
            onClick={() => onQuantityChanged(1)}
            disabled={count === 5}
            className={`${count === 5 ? 'text-gray-400' : ''}`}
            >
            <IoAddCircleOutline size={30} />
        </button>

    </div>
  )
}