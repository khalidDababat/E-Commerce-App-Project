import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Typography,
    InputAdornment,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    MenuItem,
    InputLabel,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { getAllCategories } from '../../api/Category';

import './ProductForm.scss';

interface ProductFormProps {
    initialData?: {
        name?: string;
        price?: string;
        description?: string;
        categoryId?: number | string;
        category_id?: number | string;
        categoryName?: string;
        stock?: number;
        image?: string;
        isActive?: boolean;
    };
    onSubmit: (formData: FormData) => void;
    onCancel: () => void;
    submitLabel?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
    initialData = {},
    onSubmit,
    onCancel,
    submitLabel = 'Save',
}) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [nameProduct, setNameProduct] = useState(initialData.name || '');
    const [priceProduct, setPriceProduct] = useState(initialData.price || '');
    const [description, setDescription] = useState(
        initialData.description || ''
    );
    const [categoryId, setCategoryId] = useState<number | ''>('');
    const [stock, setStock] = useState<number>(initialData.stock || 0);
    const [file, setFile] = useState<File | null>(null);
    const [isActive, setIsActive] = useState<boolean>(
        initialData.isActive !== undefined ? initialData.isActive : true
    );
    const [categoriesList, setCategoriesList] = useState<any[]>([]);

    useEffect(() => {
        if (initialData.image) {
            setImagePreview(initialData.image);
        }
    }, [initialData.image]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategoriesList(data);

                if (initialData.category_id !== undefined) {
                    setCategoryId(Number(initialData.category_id));
                } else if (initialData.categoryId !== undefined) {
                    setCategoryId(Number(initialData.categoryId));
                } else if (initialData.categoryName) {
                    const found = data.find(
                        (cat: any) => cat.category === initialData.categoryName
                    );

                    if (found) {
                        setCategoryId(found.id);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchCategories();
    }, [
        initialData.categoryName,
        initialData.categoryId,
        initialData.category_id,
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', nameProduct);
        formData.append('price', priceProduct);
        formData.append('description', description);
        formData.append('categoryId', categoryId.toString());
        formData.append('stock', stock.toString());

        if (file) {
            formData.append('image', file);
        }
        formData.append('isActive', isActive.toString());

        onSubmit(formData);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <Box className="product-form-container">
            <form onSubmit={handleSubmit}>
                <Box className="form-grid">


                    <Box className="fields-section">
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label="إسم المنتج"
                                    value={nameProduct}
                                    onChange={(e) =>
                                        setNameProduct(e.target.value)
                                    }
                                    required
                                    fullWidth
                                    size="small"
                                />
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <TextField
                                    label="سعر المنتج"
                                    value={priceProduct}
                                    onChange={(e) =>
                                        setPriceProduct(e.target.value)
                                    }
                                    required
                                    fullWidth
                                    type="number"
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start"
                                                sx={{ paddingRight: 1 }}
                                            >
                                                ₪
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <TextField
                                    label="الكمية"
                                    value={stock}
                                    onChange={(e) =>
                                        setStock(Number(e.target.value))
                                    }
                                    type="number"
                                    fullWidth
                                    size="small"
                                    sx={{ paddingRight: 1 }}
                                />
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <FormControl fullWidth required size="small">
                                    <InputLabel id="category-label">
                                        الفئة
                                    </InputLabel>
                                    <Select
                                        labelId="category-label"
                                        value={categoryId}
                                        label="الفئة"
                                        disabled={!categoriesList.length}
                                        onChange={(e) =>
                                            setCategoryId(
                                                Number(e.target.value)
                                            )
                                        }
                                    >
                                        {categoriesList.map((cat) => (
                                            <MenuItem
                                                key={cat.id}
                                                value={cat.id}
                                            >
                                                {cat.category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <FormControl fullWidth size="small">
                                    <RadioGroup
                                        className="status-radio-group"
                                        row
                                        value={isActive.toString()}
                                        onChange={(e) =>
                                            setIsActive(
                                                e.target.value === 'true'
                                            )
                                        }
                                    >
                                        <FormControlLabel
                                            value="true"
                                            control={<Radio size="small" />}
                                            label="نشط"
                                        />
                                        <FormControlLabel
                                            value="false"
                                            control={<Radio size="small" />}
                                            label="غير نشط"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label="وصف المنتج"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    multiline
                                    rows={3}
                                    fullWidth
                                    size="small"
                                />
                            </Grid>
                        </Grid>

                        <Box className="action-stack">
                            <Button
                                className="btn"
                                variant="outlined"
                                color="secondary"
                                startIcon={<CancelIcon />}
                                onClick={onCancel}
                            >
                                إلغاء
                            </Button>
                            <Button
                                className="btn"
                                type="submit"
                                variant="contained"
                                startIcon={<SaveIcon />}
                            >
                                {submitLabel}
                            </Button>
                        </Box>
                    </Box>

                    <Box className="image-section">
                        <Box className="image-upload-box" component="label">
                            <input
                                accept="image/*"
                                type="file"
                                hidden
                                onChange={handleFileChange}
                            />
                            {imagePreview ? (
                                <Box
                                    component="img"
                                    src={imagePreview}
                                    alt="Preview"
                                    className="preview-img"
                                />
                            ) : (
                                <>
                                    <CloudUploadIcon className="upload-icon" />
                                    <Typography
                                        className="upload-text"
                                        variant="body2"
                                    >
                                        اضغط لتحميل الصورة
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default ProductForm;
