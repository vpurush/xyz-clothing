import {createAction} from '@reduxjs/toolkit';
import ProductService from './product.service';

const FETCH_PRODUCTS_START = 'product/fetch_start';
const FETCH_PRODUCTS_SUCCESS = 'product/fetch_success';
const FETCH_PRODUCTS_FAILURE = 'product/fetch_failure';
const SAVE_PRODUCT = 'product/save';

const FetchProductsStart = createAction(FETCH_PRODUCTS_START);
const FetchProductsSuccess = createAction(FETCH_PRODUCTS_SUCCESS);
const FetchProductsFailure = createAction(FETCH_PRODUCTS_FAILURE);

const FetchProducts = () => {
    return (dispatch) => {
        dispatch(FetchProductsStart());
        ProductService.FetchProducts().then((products) => {
            dispatch(FetchProductsSuccess(products));
        }).catch(err => {
            dispatch(FetchProductsFailure(err.message));
        });
    }
};

const SaveProduct = createAction(SAVE_PRODUCT);

export const ActionNames = {
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    SAVE_PRODUCT
};

export default {
    FetchProducts,
    SaveProduct
}
