## Description
This is a project to simulate Tesla.com Apparel e-commerce website. The project was developed using Next.js, Typescript, Zustand, Prisma, Docker and Postgres.

## Run on dev mode
1. Clone respository
2. Create a .env file copying the ```.env.example``` file
3. Change environment variables of the .env file for database connection
4. Install dependecies ```npm install```
5. run dabase docker container ```docker compose up -d```
6. Run Prisma migration ```npx prisma migrate dev```
7. Run seed ```npm run seed```
8. Clean browser's local storage
6. Run project ```npm run dev```

## Project Routes Structure
```
├───public
│   ├───imgs
│   └───products
└───src
    ├───app
    │   ├───(shop)
    │   │   ├───admin         /admin
    │   │   ├───cart          /cart
    │   │   ├───category        
    │   │   │   └───[id]      /category/:id
    │   │   ├───checkout      /checkout
    │   │   │   └───address   /checkout/address
    │   │   ├───empty         /empty
    │   │   ├───orders        /orders      
    │   │   │   └───[id]      /orders/:id
    │   │   ├───product
    │   │   │   └───[slug]    /product/:slug
    │   │   └───products      /products
    │   └───auth
    │       ├───login         /auth/login
    │       └───new-account   /auth/new-account
    ├───components
    │   ├───cart
    │   ├───product
    │   ├───products
    │   └───ui
    ├───config
    ├───interfaces
    ├───seed
    └───store
```