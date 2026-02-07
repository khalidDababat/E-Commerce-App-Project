import { toast } from 'react-toastify';

export const createNewProduct = async (formData: FormData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/products`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            }
        );

        if (!response.ok) {
            toast.error('فشل إضافة المنتج');
        } else {
            toast.success('تم إضافة المنتج بنجاح');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('error ', err);
    }
};
