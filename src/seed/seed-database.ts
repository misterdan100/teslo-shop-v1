import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  // 1. Clean previous data in db
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const { categories, products, users } = initialData;

  // 2.1 Insert users 
  await prisma.user.createMany({data: users})

  // 2. Insert categories
  const categoriesData = categories.map((category) => ({ name: category }));
  await prisma.category.createMany({ data: categoriesData });

  // 3. Map to modify database data
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((total, category) => {
    total[category.name.toLowerCase()] = category.id;
    return total;
  }, {} as Record<string, string>);

  // 4. Map to create products
  const updatedProducts = products.map(product => {
      const { images, type, ...rest } = product
      return {
          ...rest,
          categoryId: categoriesMap[product.type],
      }
  })

  await prisma.product.createMany({data: updatedProducts})


  // 5. Foreach to Map images
  //get all products from db
  const productsDataBase = await prisma.product.findMany();

  // foreach to catch all images from products seed
  const imagesMap = products.reduce((map, product) => {

    // catch id product db comparing slug of local seed
    const productId = productsDataBase.find(
      (productdb) => productdb.slug === product.slug
    )?.id!;

    // catch in an array all images from each product
    const tempImages = product.images.reduce((total, image) => {
      total.push({
        url: image,
        productId,
      });
      return total;
    }, [] as any);

    // return compiled images objects
    map = [...map, ...tempImages];
    return map;
  }, [] as any);

  // save images array with prisma in db
  await prisma.productImage.createMany({ data: imagesMap });

  console.log("seed excecuted");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
