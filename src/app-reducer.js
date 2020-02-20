import {combineReducers} from 'redux';

const AppReducer = combineReducers({
    products: (prevState=[], action) => prevState
});
export default AppReducer;