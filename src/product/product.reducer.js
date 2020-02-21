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
        let products = [...prevState];

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
        let indexToBeRemoved = products.indexOf(prodToBeRemoved);
        products.splice(indexToBeRemoved, 1, prodToBeAdded);
        // console.log("products", products);


        // When ID of product is modified, update relatedProducts array of other items
        if(action.payload.originalId != action.payload.id){
            console.log("id mismatch")
            products = products.map(p => {
                const indexToBeRemovedInRelatedProducts = p.relatedProducts.indexOf(action.payload.originalId);
                if (indexToBeRemovedInRelatedProducts != -1){
                    indexToBeRemoved = products.indexOf(p);
                    const newProduct = {...p};
                    const clonedRelatedProducts = [...newProduct.relatedProducts];
                    clonedRelatedProducts.splice(indexToBeRemovedInRelatedProducts, 1, action.payload.id);
                    newProduct.relatedProducts = clonedRelatedProducts;
                    return newProduct;
                } else {
                    return p;
                }
            });
        }

        return products;
    }
});


export default ProductReducer;