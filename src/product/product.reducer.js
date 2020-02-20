import {createReducer} from '@reduxjs/toolkit';
import {ActionNames as ProductActionNames} from './product.actions';

const ProductReducer = createReducer([], {
    [ProductActionNames.FETCH_PRODUCTS_SUCCESS]: (prevState, action) => {
        action.payload.error = null;
        return action.payload;
    },
    [ProductActionNames.FETCH_PRODUCTS_FAILURE]: (prevState, action) => {
        const products = [];
        products.error = action.payload.message;
        return products;
    }
});


export default ProductReducer;