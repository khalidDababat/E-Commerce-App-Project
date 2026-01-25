import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Typography,
    Paper,
    Stack,
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
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategoriesList(data);

                if (initialData.categoryId !== undefined) {
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
    }, [initialData.categoryName]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', nameProduct);
        formData.append('price', priceProduct);
        formData.append('description', description);
        formData.append('categoryId', categoryId.toString());
        formData.append('stock', stock.toString());

        if (file) formData.append('image', file);
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
        <Box sx={{ p: 1 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ textAlign: 'right' }}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                border: '2px dashed',
                                borderColor: 'divider',
                                borderRadius: 2,
                                p: 2,
                                textAlign: 'center',
                                cursor: 'pointer',
                                minHeight: 150,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    bgcolor: 'action.hover',
                                },
                            }}
                            component="label"
                        >
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
                                    sx={{
                                        width: '100%',
                                        maxHeight: 180,
                                        objectFit: 'contain',
                                        borderRadius: 1,
                                    }}
                                />
                            ) : (
                                <>
                                    <CloudUploadIcon
                                        sx={{
                                            fontSize: 40,
                                            color: 'text.secondary',
                                            mb: 1,
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        اضغط لتحميل الصورة
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 8 }}>
                        <Grid container spacing={1.5}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label=" إسم المنتج"
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
                                            <InputAdornment position="start">
                                                $
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
                                        row
                                        value={isActive.toString()}
                                        onChange={(e) =>
                                            setIsActive(
                                                e.target.value === 'true'
                                            )
                                        }
                                        sx={{ justifyContent: 'center' }}
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
                                    rows={2}
                                    fullWidth
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-end"
                            sx={{ mt: 1 }}
                        >
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<CancelIcon />}
                                onClick={onCancel}
                                size="large"
                            >
                                الغاء
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<SaveIcon />}
                                size="large"
                            >
                                {submitLabel}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default ProductForm;
