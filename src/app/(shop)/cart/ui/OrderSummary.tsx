"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const cart = useCartStore( state => state.cart)
  const productsInCart = useCartStore( state => state.getTotalItems())
  const getSummaryInformation = useCartStore((state) => state.getSummaryInformation);
  const { itemsInCart, subTotal, tax, total } = getSummaryInformation()
//   const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
//     state.getSummaryInformation()
//   );

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if(productsInCart === 0) {
        redirect('/empty')
    }
  }, [cart])

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2">
      <span>No. Products</span>
      <span className="text-right">{itemsInCart} articles</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Taxes (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl font-semibold">Total: </span>
      <span className="text-right mt-5 text-2xl font-semibold">
        {currencyFormat(total)}
      </span>
    </div>
  );
};
