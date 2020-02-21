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
    },
    [ProductActionNames.SAVE_PRODUCT]: (prevState, action) => {
        const products = [...prevState];

        const prodToBeRemoved = products.find(p => p.id == action.payload.originalId);
        const prodToBeAdded = {
            id: action.payload.id,
            name: action.payload.name,
            description: action.payload.description,
            price:{
                base: action.payload.currency,
                amount: action.payload.amount
            },
            relatedProducts: action.payload.relatedProducts
        };
        const indexToBeRemoved = products.indexOf(prodToBeRemoved);
        products.splice(indexToBeRemoved, 1, prodToBeAdded);
        console.log("products", products);

        return products;
    }
});


export default ProductReducer;