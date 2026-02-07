export type Product = {
    id: string;
    name: string;
    price: number;
    description?: string;
    category: string;
    image?: string;
    features?: string;
};

export interface Feature {
    id: number | string;
    name: string;
}
