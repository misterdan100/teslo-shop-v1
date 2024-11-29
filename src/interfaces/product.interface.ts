export interface Product {
    id: string
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    // todo: type: Type;
    gender: ValidCategories
}

export interface CartProduct {
    id: string
    slug: string
    title: string
    price: number
    images: string;
    quantity: number
    size: Size
}

export type ValidCategories = 'men'|'women'|'kid'|'unisex'
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';