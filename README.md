# 🛍️ Tesla Apparel E-commerce Simulation

[![Next.js](https://img.shields.io/badge/Next.js-^14.0-black.svg?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-^5.0-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/Zustand-latest-green.svg)](https://github.com/pmndrs/zustand)
[![Prisma](https://img.shields.io/badge/Prisma-latest-1B222D.svg?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-^15.0-336791.svg?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-latest-2496ED.svg?logo=docker)](https://www.docker.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-latest-blue.svg?logo=nextdotjs)](https://next-auth.js.org/)

Full-stack web application simulating an e-commerce site inspired by Tesla Apparel, designed for managing product catalogs, users, and purchasing processes. It allows users to browse, filter by category, manage shopping carts and orders, featuring secure authentication and a robust architecture using Next.js, Typescript, Zustand, Prisma, Docker, and PostgreSQL.

## ✅ Live Demo

[https://mister-shop.vercel.app/](https://mister-shop.vercel.app/)

- Use **Demo** button or **Sign Up** with email and password

## ✨ Key Features

- 🛍️ **Product Catalog Management:** Display and manage a comprehensive list of products.
- 👤 **User Management:** Secure user registration, login, and profile management.
- 🛒 **Shopping Cart:** Fully functional shopping cart to add and manage items before purchase.
- 📄 **Order Management:** System for users to place and track their orders.
- 🎛️ **Product Filtering & Pagination:** Easily find products by category and navigate through product pages.
- 🔐 **Authentication & Authorization:** Secure access control using Next-Auth.
- 🐳 **Containerized Deployment:** Ready for deployment using Docker.

## 🛠️ Technologies Used

- **Frontend Framework:** Next.js (with React)
- **Language:** TypeScript
- **State Management:** Zustand
- **Backend Framework (via Next.js server-actions):** Next.js
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** Next-Auth
- **Containerization:** Docker

## 🚀 Local Quick Start

Follow these steps to set up and run the project in your local environment:

```bash
# 1. Clone the repository
git clone https://github.com/misterdan100/teslo-shop-v1
cd teslo-shop-v1

# 2. Create a .env file by copying the .env.example file
cp .env.template .env

# 3. Change environment variables in the .env file for your database connection
Example: DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
Ensure you also set NEXTAUTH_URL, NEXTAUTH_SECRET, and any other required variables.

# 4. Install dependencies
npm install

# 5. Run the database Docker container
docker compose up -d
# (Ensure Docker Desktop is running)

# 6. Run Prisma migrations to set up the database schema
npx prisma migrate dev

# 7. (Optional) Run the seed script to populate the database with initial data
npm run seed

# 8. Clean the browser's local storage (recommended if you had a previous version running)
This can be done manually through your browser's developer tools.

# 9. Run the project in development mode
npm run dev

# 10. Access the application
Open http://localhost:3000 (or the configured port) in your browser.
```
Note: Ensure you have Node.js (v18 or higher recommended), npm/yarn, and Docker installed and configured on your system.📁 Project Routes StructureThe application follows a standard Next.js 

## App Router structure:
```
├───public
│   ├───imgs        # Static images
│   └───products    # Product images
└───src
    ├───app
    │   ├───(shop)      # Main shop layout and routes
    │   │   ├───admin         # Admin dashboard (/admin)
    │   │   ├───cart          # Shopping cart page (/cart)
    │   │   ├───category
    │   │   │   └───[id]      # Category specific products page (/category/:id)
    │   │   ├───checkout
    │   │   │   └───address   # Checkout address page (/checkout/address)
    │   │   ├───empty         # Empty cart/no products page (/empty)
    │   │   ├───orders
    │   │   │   └───[id]      # Specific order details page (/orders/:id)
    │   │   ├───product
    │   │   │   └───[slug]    # Product details page (/product/:slug)
    │   │   └───products      # All products page (/products)
    │   └───auth            # Authentication routes
    │       ├───login         # Login page (/auth/login)
    │       └───new-account   # New account registration page (/auth/new-account)
    ├───components          # Reusable UI components
    │   ├───cart
    │   ├───product
    │   ├───products
    │   └───ui              # General UI elements (buttons, inputs, etc.)
    ├───config              # Configuration files (e.g., Next-Auth config)
    ├───interfaces          # TypeScript interfaces and types
    ├───seed                # Database seed scripts and data
    └───store               # Zustand store setup
```