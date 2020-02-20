import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AppReducer from './app-reducer';

const defaultState = {
    products: []
};

const AppStore = configureStore({
    reducer: AppReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: defaultState,
    middleware: getDefaultMiddleware() //Thunk is included in this by Redux Toolkit
});

export default AppStore;