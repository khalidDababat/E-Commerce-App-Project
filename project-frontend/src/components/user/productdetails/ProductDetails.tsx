import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    IconButton,
    Typography,
    Box,
    Button,
    Chip,
    Stack,
    CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/Store';
import { useProductActions } from '../../../hooks/useProductActions';
import './ProductDetails.scss';

interface ProductDetailsProps {
    open: boolean;
    onClose: () => void;
    id: number;
    name: string;
    price: number;
    image?: string;
    description?: string;
}

interface Feature {
    id: number;
    name: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    open,
    onClose,
    id,
    name,
    price,
    image,
    description,
}) => {
    const { isFavorite, handleToggleFavorite, handleAddToCart, getTotalPrice } =
        useProductActions({
            id,
            name,
            price,
            image: image || '',
        });

    const [quantity, setQuantity] = useState(1);
    const [features, setFeatures] = useState<Feature[]>([]);
    const [loadingFeatures, setLoadingFeatures] = useState(false);
    const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);

    useEffect(() => {
        if (open) {
            fetchFeatures();
            setQuantity(1);
            setSelectedFeatures([]);
        }
    }, [open, id]);

    const fetchFeatures = async () => {
        setLoadingFeatures(true);
        try {
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_UR}/product-features/${id}`
            );
            const data = await res.json();
            setFeatures(data);
        } catch (error) {
            console.error('Error fetching features:', error);
        } finally {
            setLoadingFeatures(false);
        }
    };

    const handleAddQuantity = () => setQuantity((prev) => prev + 1);
    const handleRemoveQuantity = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleToggleFeature = (featureId: number) => {
        setSelectedFeatures((prev) =>
            prev.includes(featureId)
                ? prev.filter((id) => id !== featureId)
                : [...prev, featureId]
        );
    };

    const handleAddToCartClick = () => {
        handleAddToCart(quantity);
        onClose();
    };

    const totalPrice = getTotalPrice(quantity);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                className: 'product-details-dialog',
            }}
        >
            <DialogContent className="dialog-content">
                <Box className="image-container">
                    <img
                        src={`${process.env.REACT_APP_BACKEND_UR}${image}`}
                        alt={name}
                        className="product-image"
                    />
                    <IconButton className="close-button" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                    <IconButton
                        className="favorite-button"
                        onClick={(e) => handleToggleFavorite(e)}
                    >
                        {isFavorite ? (
                            <FavoriteIcon sx={{ color: '#ff5252' }} />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                    </IconButton>
                </Box>

                <Box className="details-container">
                    <Typography variant="h5" className="product-name">
                        {name}
                    </Typography>
                    {description && (
                        <Typography
                            variant="body2"
                            className="product-description"
                        >
                            {description}
                        </Typography>
                    )}

                    <Box className="additions-section">
                        <Typography
                            variant="subtitle1"
                            className="section-title"
                        >
                            اضافات
                        </Typography>
                        {loadingFeatures ? (
                            <CircularProgress size={24} />
                        ) : (
                            <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                                useFlexGap
                            >
                                {features.map((feat) => (
                                    <Chip
                                        key={feat.id}
                                        label={feat.name}
                                        onClick={() =>
                                            handleToggleFeature(feat.id)
                                        }
                                        className={`feature-chip ${selectedFeatures.includes(feat.id) ? 'selected' : ''}`}
                                    />
                                ))}
                            </Stack>
                        )}
                    </Box>
                </Box>

                <Box className="dialog-footer">
                    <Box className="quantity-selector">
                        <IconButton
                            onClick={handleRemoveQuantity}
                            className="qty-btn"
                            disabled={quantity <= 1}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <Typography className="quantity-value">
                            {quantity}
                        </Typography>
                        <IconButton
                            onClick={handleAddQuantity}
                            className="qty-btn"
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                    <Button
                        variant="contained"
                        className="add-to-cart-btn"
                        onClick={handleAddToCartClick}
                    >
                        <Box>
                            <span>إضافة إلى السلة</span>
                        </Box>
                        <span className="total-price">₪{totalPrice}</span>
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetails;
