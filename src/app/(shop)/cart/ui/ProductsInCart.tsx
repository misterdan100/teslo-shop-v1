"use client";

import { QuantitySelector } from "@/components";
import { CartProduct, Product } from "@/interfaces";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProduct = useCartStore( state => state.removeProduct)

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleQuantity = (product: CartProduct, value: number) => {
    updateProductQuantity({
        ...product,
        quantity: value
    })
    
  }

  return (
    <>
      {loaded &&
        productsInCart.map((product) => (
          <div key={product.slug + product.size} className="flex mb-5">
            <Image
              src={`/products/${product.images}`}
              width={100}
              height={100}
              alt={product.title}
              style={{
                width: "100px",
                height: "100px",
              }}
              className="mr-5 rounded"
            />

            <div>
              <Link href={`/product/${product.slug}`}>{`${product.size} - ${product.title}`}</Link>
              <p>$ {product.price.toFixed(2)}</p>
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChanged={(value) => handleQuantity(product, value)}
              />

              <button 
                className="underline mt-3"
                onClick={() => removeProduct(product)}
              >Remove</button>
            </div>
          </div>
        ))}
    </>
  );
};
