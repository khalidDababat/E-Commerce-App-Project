import React, { useState, useEffect } from 'react';
import './Category.scss';
import { getAllCategories } from '../../api/Category';

interface CategoryProps {
    active: string;
    setActive: (category: string) => void;
}

const Category = ({ active, setActive }: CategoryProps) => {
    const [categories, setCategories] = useState<string[]>(['الكل']);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                // Extracting the category names from the returned objects
                const categoryNames = data.map((item: any) => item.category);

                // Merge with "الكل" if it's not already in the list
                const finalCategories = [
                    'الكل',
                    ...categoryNames.filter((name: string) => name !== 'الكل'),
                ];
                setCategories(finalCategories);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="categories-container">
            {categories.map((item) => (
                <button
                    key={item}
                    className={`category-item ${active === item ? 'active' : ''}`}
                    onClick={() => setActive(item)}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};

export default Category;
