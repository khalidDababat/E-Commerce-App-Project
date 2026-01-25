import React, { Fragment, useState, useEffect } from 'react';
import CategoryItem from '../category-management/CategoryItem';

import {
    getAllFeatuers,
    handleAddFeetFood,
    deleteFeetFood,
} from '../../api/FeaturesFood';

const AddfeatFood = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [featFood, setfeatFood] = useState('');

    const [featuers, setfeatuers] = useState<any[]>([]);

    const fetchFeatuers = async () => {
        const data = await getAllFeatuers();
        setfeatuers(data);
    };

    useEffect(() => {
        fetchFeatuers();
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <Fragment>
            <div className="category-management">
                <div className="main-content">
                    <h1>إضافة إضافات للوجبات </h1>
                    <button onClick={toggleModal} className="add-btn">
                        إضافة إضافات جديدة
                    </button>
                    <hr />
                    <div className="category-list row">
                        {featuers.map((feet) => (
                            <div key={feet.id} className="col-md-4 mb-4">
                                <CategoryItem
                                    category={feet.name}
                                    onDelete={async () => {
                                        const conferm = window.confirm(
                                            `Are you sure you want to delete ${feet.name}?`
                                        );
                                        if (!conferm) {
                                            return;
                                        }
                                        await deleteFeetFood(feet.id);
                                        fetchFeatuers();
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
                            <h2>إضافة إضافات جديدة</h2>
                            <form
                                onSubmit={async (e) => {
                                    await handleAddFeetFood(e, featFood);
                                    fetchFeatuers();
                                    setIsModalOpen(false);
                                    setfeatFood('');
                                }}
                            >
                                <div className="form-group">
                                    <label htmlFor="name">اسم الأضافة :</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={featFood}
                                        onChange={(e) =>
                                            setfeatFood(e.target.value)
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

export default AddfeatFood;
