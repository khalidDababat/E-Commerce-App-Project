import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProductForm from '../ProductForm/ProductForm';
import { toast } from 'react-toastify';

interface UpdateProductProps {
    product: any;
    onClose: () => void;
    onUpdateSuccess: () => void;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({
    product,
    onClose,
    onUpdateSuccess,
}) => {
    const handelUpdate = async (formData: FormData) => {
        try {
            if (!formData.get('image')) {
                formData.append('existingImage', product.image);
            }

            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/products/${product.id}`,
                {
                    method: 'PUT',
                    body: formData,
                }
            );

            if (!res.ok) {
                toast.error('فشل في تحديث بيانات المنتج');
            } else {
                onUpdateSuccess();
                toast.success('تم تحديث بيانات المنتج بنجاح');
            }
        } catch (error) {
            console.log('Update failed Product', error);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle
                sx={{
                    m: 0,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h5" fontWeight="bold" component="div">
                    تحديث منتج
                </Typography>
                <IconButton aria-label="close" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <ProductForm
                    initialData={{
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        category_id: product.category_id,
                        categoryName: product.category,
                        stock: product.stock,
                        image: product.image
                            ? `${process.env.REACT_APP_BACKEND_URL}${product.image}`
                            : '',
                        isActive: product.isActive,
                    }}
                    onSubmit={handelUpdate}
                    onCancel={onClose}
                    submitLabel="تحديث المنتج"
                />
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProduct;
