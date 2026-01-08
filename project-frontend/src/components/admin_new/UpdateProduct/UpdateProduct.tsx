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
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_UR}/products/${product.id}`,
                {
                    method: 'PUT',
                    body: formData,
                }
            );

            if (!res.ok) {
                toast.error('Update failed Product');
            } else {
                onUpdateSuccess();
                toast.success('Update success Product');
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
                <Typography variant="h5" fontWeight="bold">
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
                        categoryId: product.categoryId,
                        categoryName: product.category,
                        stock: product.stock,
                        image: product.image
                            ? `${process.env.REACT_APP_BACKEND_UR}${product.image}`
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
