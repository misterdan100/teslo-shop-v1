'use client'

import type { Size } from "@/interfaces"
import clsx from "clsx"

interface Props {
    selectedSize?: Size
    availableSizes: Size[]

    onSizeChanged: ( size: Size) => void
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {
  
  return (
    <div className="my-5">
        <h3 className="font-bold mb-4">Available Sizes</h3>

        <div className="flex">
            {availableSizes.map( size => (
                <button
                    key={size}
                    // className={clsx(
                    //     'mx-2 hover:border-black text-lg border-b-2 border-transparent',
                    //     {
                    //         'border-black': selectedSize === size
                    //     }
                    // )}
                    className={`${selectedSize === size ? 'border-gray-950 font-bold' : ''} mx-2 hover:border-black text-lg border-b-2 border-transparent`}
                    onClick={() => onSizeChanged(size)}
                >{size}</button>
            ))}
        </div>
    </div>
  )
}