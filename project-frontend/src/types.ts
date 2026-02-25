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

export interface Notification {
    id: number;
    user_id: number;
    order_id: number;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export interface Feature {
    id: number;
    name: string;
}
