import React from 'react';
import { deleteCategory } from '../../api/Category';
import DeleteIcon from '@mui/icons-material/Delete';

interface CategoryItemProps {
    category: string;
    onDelete: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onDelete }) => {
    return (
        <div className="category-item card">
            <div className="card-body">
                <h5 className="card-title">{category}</h5>
                <button
                    className="delete-icon  btn btn-danger"
                    onClick={onDelete}
                >
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
};

export default CategoryItem;
