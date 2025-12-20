import React from 'react';
import MainHeader from '../Headers/MainHeader'; 
import Category from '../Category/Category';

import ProductList from '../ProductList/ProductList';

const MainLayout = () => {
  return (
    <div>
        
        <MainHeader/> 

        <div className="container">
            <Category/>
           
            <ProductList/>
        </div>
    </div>
  );
}
;
export default MainLayout;
