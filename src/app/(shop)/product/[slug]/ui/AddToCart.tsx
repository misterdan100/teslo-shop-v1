"use client";

import { useState } from "react";

import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addProductToCart = useCartStore( state => state.addProductToCart)
  const cartState = useCartStore( state => state.cart)

  const addToCart = () => {

    // Validate if size is selected
    if (!size) {
        setPosted(true)
        return
    };

    
    
    addProductToCart({
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      images: product.images[0]
    })
    
    setPosted(false)
    setSize(undefined)
    setQuantity(1)


  };

  return (
    <>
      {posted && <span className="mt-2 text-red-500 fade-in">Size is required, select one.</span>}

      {/* Select Sizes */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* Select quantity */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Button add to cart */}
      <button
        disabled={!!(product.inStock === 0)}
        className="btn-primary my-5 disabled:opacity-25 disabled:bg-blue-600"
        onClick={addToCart}
      >
        Add to cart
      </button>
    </>
  );
};
