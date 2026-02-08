export type Product = {
    id: string;
    name: string;
    price: number;
    description?: string;
    //category: string;
    category_id: number;
    image?: string;
    features?: string;
};

export interface Feature {
    id: number;
    name: string;
}
