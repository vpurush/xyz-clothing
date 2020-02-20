import {combineReducers} from 'redux';
import ProductReducer from './product/product.reducer';

const AppReducer = combineReducers({
    products: ProductReducer
});
export default AppReducer;