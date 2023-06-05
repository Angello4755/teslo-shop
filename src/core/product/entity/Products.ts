export interface Product {
    _id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    type: Types;
    gender: 'men'|'women'|'kid'|'unisex';
    createAt: string;
    updateAt: string;
}

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Types = 'shirts'|'pants'|'hoodies'|'hats';
