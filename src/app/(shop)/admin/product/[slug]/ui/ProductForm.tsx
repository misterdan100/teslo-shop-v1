"use client";

import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";
import { Category, Product, ProductImage as TProductImages } from "@/interfaces";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoReload } from "react-icons/io5";

interface Props {
  product: Partial<Product> & { ProductImage?: TProductImages[] };
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;

  images?: FileList
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      images: undefined
    },
  });

  watch("sizes"); // to rerender when sizes change

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues("sizes")); // set for unique values

    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue("sizes", Array.from(sizes));
  };

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);
    const formData = new FormData();

    const { images, ...productToSave } = data;
    if (product.id) {
      formData.append("id", product.id ?? "");
    }
    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags.toString());
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);

    if( images ) {
      for( let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);
    setLoading(false);

    if( !ok ) {
      return
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`)


    
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gap-3 grid grid-cols-1 sm:grid-cols-2 mb-16 px-5 sm:px-0"
    >
      {/* Texts */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input
            type="text"
            className="bg-gray-200 p-2 border rounded-md"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="bg-gray-200 p-2 border rounded-md"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description </span>
          <textarea
            className="bg-gray-200 p-2 border rounded-md h-40"
            {...register("description", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="bg-gray-200 p-2 border rounded-md"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="bg-gray-200 p-2 border rounded-md"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="bg-gray-200 p-2 border rounded-md"
            {...register("gender", { required: true })}
          >
            <option value="">[Select]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select
            className="bg-gray-200 p-2 border rounded-md"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Select]</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={clsx(
            "flex justify-center items-center gap-2 w-full btn-primary",
            {
              "opacity-50 hover:bg-blue-600 cursor-default ": !isValid,
            }
          )}
        >
          Save {loading && <IoReload size={22} className="animate-spin" />}
        </button>
      </div>

      {/* Sizes and Photos selector */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          <div className="flex flex-col mb-2">
            <span>Stock</span>
            <input
              type="number"
              className="bg-gray-200 p-2 border rounded-md"
              {...register("inStock", { required: true, min: 0 })}
            />
          </div>

          <span>Sizes</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => onSizeChange(size)}
                className={clsx(
                  "flex justify-center items-center hover:bg-gray-100 mr-2 px-4 border rounded-md w-10 h-10 transition-colors cursor-pointer",
                  {
                    "bg-blue-500 text-white hover:bg-blue-600":
                      getValues("sizes").includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Photos</span>
            <input
              type="file"
              { ...register('images') }
              multiple
              className="bg-gray-200 p-2 border rounded-md"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>

          <div className="gap-3 grid grid-cols-1 sm:grid-cols-3">
            {product.ProductImage?.map((image) => (
              <div key={image.id} className="">
                <ProductImage
                  src={image.url}
                  alt={`${product.title} image ${image.id}`}
                  width={300}
                  height={300}
                  className="shadow-md rounded-t"
                />
                <button
                  type="button"
                  onClick={() => deleteProductImage(image.id, image.url)}
                  className="rounded-b-xl w-full btn-danger"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
