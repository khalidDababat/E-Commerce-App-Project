import React, { Fragment, useEffect, useState } from 'react';
import './CategoryManagement.scss';
import CategoryItem from './CategoryItem';
import {
    getAllCategories,
    deleteCategory,
    handleAddCategory,
} from '../../api/Category';

const CategoryManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nameCategory, setnameCategory] = useState('');

    const [categories, setCategories] = useState<any[]>([]);

    const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <Fragment>
            <div className="category-management">
                <div className="main-content">
                    <h1>إضافة اصناف جديدة للمتجر </h1>
                    <button onClick={toggleModal} className="add-btn">
                        إضافة صنف جديد
                    </button>
                    <hr />
                    <div className="category-list row">
                        {categories.map((cat) => (
                            <div key={cat.id} className="col-md-4 mb-4">
                                <CategoryItem
                                    category={cat.category}
                                    onDelete={async () => {
                                        const conferm = window.confirm(
                                            `Are you sure you want to delete ${cat.category}?`
                                        );
                                        if (!conferm) {
                                            return;
                                        }
                                        await deleteCategory(cat.id);
                                        fetchCategories();
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button onClick={toggleModal} className="close-btn">
                                &times;
                            </button>
                            <h2>إضافة صنف جديد</h2>
                            <form
                                onSubmit={async (e) => {
                                    await handleAddCategory(e, nameCategory);
                                    fetchCategories();
                                    setIsModalOpen(false);
                                    setnameCategory('');
                                }}
                            >
                                <div className="form-group">
                                    <label htmlFor="name">اسم الصنف :</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={nameCategory}
                                        onChange={(e) =>
                                            setnameCategory(e.target.value)
                                        }
                                    />
                                </div>
                                <button type="submit" className="submit-btn">
                                    إضافة
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default CategoryManagement;
