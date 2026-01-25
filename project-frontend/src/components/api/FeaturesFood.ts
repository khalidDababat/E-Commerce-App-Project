import { toast } from 'react-toastify';

export const handleAddFeetFood = async (
    e: React.FormEvent<HTMLFormElement>,
    name: string
) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_BACKEND_UR}/features`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name: name }),
    });

    if (!res.ok) {
        toast.error('Failed to add Featuer', { position: 'top-center' });
    } else {
        toast.success('Featuer added successfully', {
            position: 'top-center',
        });
    }

    const data = await res.json();
    return data;
};

export const deleteFeetFood = async (id: string) => {
    const res = await fetch(
        `${process.env.REACT_APP_BACKEND_UR}/features/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );

    if (!res.ok) {
        toast.error('Failed to delete Featuer', { position: 'top-center' });
    } else {
        toast.success('Featuer deleted successfully', {
            position: 'top-center',
        });
    }

    const data = await res.json();
    return data;
};

export const getAllFeatuers = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_UR}/features`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();
    return data;
};
//assignFeatureToProduct
export const assignFeatureToProduct = async (
    productId: number,
    featureId: number
) => {
    const res = await fetch(
        `${process.env.REACT_APP_BACKEND_UR}/product-features`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                product_id: productId,
                feature_id: featureId,
            }),
        }
    );

    if (!res.ok) {
        toast.error('Failed to assign feature');
    }
    return await res.json();
};

//getFeatguresforProductId
export const getFeatguresforProductId = async (id: string) => {
    const res = await fetch(
        `${process.env.REACT_APP_BACKEND_UR}/product-features/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );

    const data = await res.json();
    return data;
};
