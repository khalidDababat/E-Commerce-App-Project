import React, { useState } from 'react';
import { Product } from '../../../types';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../Store/features/productsSlice';

import getCategoryName from '../../../utilities/getCategoryName';
import FeatureSelectionModal from './FeatureSelectionModal';
import { getFeatguresforProductId } from '../../api/FeaturesFood';
import { useEffect } from 'react';

interface ProductItemProps {
    product: Product;
    onEdit: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onEdit }) => {
    const dispatch = useDispatch<any>();
    const [showModel, setShowModel] = useState<boolean>(false);
    const [productFeatures, setProductFeatures] = useState<any[]>([]);
    const [categoryName, setCategoryName] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const features = await getFeatguresforProductId(product.id);
                setProductFeatures(features);

                const name = await getCategoryName(product.category_id);
                if (name) {
                    setCategoryName(name);
                }
            } catch (error) {
                console.error('Failed to fetch data for product:', error);
            }
        };

        fetchData();
    }, [product.id, product.category_id]);

    const handelDeleteProduct = async (id: string) => {
        const confirmDelete = window.confirm('هل انت متأكد من حذف هذا المنتج؟');
        if (confirmDelete) {
            dispatch(deleteProduct(id));
        }
    };

    const AddFeatures = () => {
        setShowModel(true);
    };

    return (
        <div className="product-item">
            <div className="product-item-image-container">
                <img
                    src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`}
                    alt={product.name}
                />
            </div>
            <div className="product-item-title">
                <h2>{product.name}</h2>
                <p>{product.price}</p>
            </div>
            <div className="product-item-description">
                <p>{product.description}</p>
            </div>
            <div className="product-item-category">
                <p>{categoryName}</p>
            </div>

            <div className="product-item-featuers">
                {productFeatures.map((feat) => (
                    <span key={feat.id}>{feat.name}</span>
                ))}
            </div>

            <div className="product-item-actions">
                <ControlPointIcon
                    titleAccess="Add Features"
                    onClick={() => AddFeatures()}
                />
                <DeleteIcon
                    titleAccess="Delete Product"
                    onClick={() => handelDeleteProduct(product.id)}
                />
                <EditIcon
                    titleAccess="Edit Product"
                    onClick={() => onEdit(product)}
                />
            </div>

            <FeatureSelectionModal
                open={showModel}
                onClose={() => setShowModel(false)}
                productId={Number(product.id)}
                productName={product.name}
                onSuccess={() => {
                    const fetchProductFeatures = async () => {
                        try {
                            const data = await getFeatguresforProductId(
                                product.id
                            );
                            setProductFeatures(data);
                        } catch (error) {
                            console.error(
                                'Failed to fetch product features:',
                                error
                            );
                        }
                    };
                    fetchProductFeatures();
                }}
            />
        </div>
    );
};

export default ProductItem;
