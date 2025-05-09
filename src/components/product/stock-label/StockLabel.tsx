"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      const inStock = await getStockBySlug(slug);
      setStock(inStock);
      setIsLoading(false);
    };

    getStock();
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <h1
          className={`${titleFont.className} antialiased  text-xl animate-pulse bg-gray-200 rounded-xl`}
        >
          &nbsp;
        </h1>
      </>
    );
  }

  return (
    <h1 className={`${titleFont.className} antialiased  text-xl`}>
      Stock: {stock}
    </h1>
  );
};
