import {combineReducers} from 'redux';
import ProductReducer from './product/product.reducer';
import CommonReducer from './common/common.reducer';

const AppReducer = combineReducers({
    products: ProductReducer,
    common: CommonReducer
});
export default AppReducer;