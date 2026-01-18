

import React from 'react';
import './CartList.scss';
import cartEmpty from '../../../assets/images/cartEmpty.jpg';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from 'react-router-dom';


const CartList = () => {
    const navigate = useNavigate();
    return (
        <div className="card-list">

            <div className="card_list_header">

                <h3>سلة المشتريات</h3>
                <div className="back_home" onClick={() => navigate('/MainLayout')}>
                    <ArrowRightAltIcon />
                </div>
            </div>

            <div className="card_list_content">
                <img src={cartEmpty} alt="cart-empty" />
                <h3>لا توجد أصناف بالسلة</h3>
            </div>
        </div>
    )
}
export default CartList;