import React from 'react';
import MainHeader from '../Headers/MainHeader';
import Category from '../../user/Category/Category';

import ProductList from '../../user/ProductList/ProductList';

const MainLayout = () => {
  return (
    <div>

      <MainHeader />

      <div className="container">
        <Category />

        <ProductList />
      </div>
    </div>
  );
}
  ;
export default MainLayout;
