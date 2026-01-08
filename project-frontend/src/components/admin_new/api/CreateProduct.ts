import { toast } from 'react-toastify';

export const createNewProduct = async (formData: FormData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_UR}/products`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            }
        );

        if (!response.ok) {
            toast.error('create Product failed!');
        } else {
            toast.success('create Product successfully!');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('error ', err);
    }
};
