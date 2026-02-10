
import React from 'react';
import './NotFoundPage.scss';
import imgNotFound from '../../assets/images/Page Not found.jpg';
import { Link } from 'react-router-dom';


const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <img src={imgNotFound} alt="Page Not Found" className="not-found-image" />
                <h1>عذراً، الصفحة غير موجودة</h1>
                <p>يبدو أن الصفحة التي تبحث عنها قد تمت إزالتها أو تم تغيير رابطها.</p>
                <Link to="/" className="home-link">العودة للرئيسية</Link>
            </div>
        </div>
    );
};

export default NotFoundPage;