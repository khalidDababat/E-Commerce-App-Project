import { toast } from 'react-toastify';

export interface OrderData {
    user_id: number;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    customer_area: string;
    note?: string;
    status?: string;
    total_price: number;
    order_type: string;
}

export interface ProductOrderData {
    product_id: number;
    order_id: number;
    quantity: number;
}

export const createOrder = async (orderData: OrderData) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_UR}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!res.ok) {
            toast.error('فشل إنشاء الطلب', {
                position: 'top-center',
            });
            return null;
        }

        toast.success('تم إرسال الطلب بنجاح سيتم التواصل معك قريبا ', {
            position: 'top-center',
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error creating order:', error);

        return null;
    }
};

export const addProductToOrder = async (poData: ProductOrderData) => {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_UR}/productOrder`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(poData),
            }
        );

        if (!res.ok) {
            console.error('Failed to add product to order');
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error('Error adding product to order:', error);
        return null;
    }
};
