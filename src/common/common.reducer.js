import {createReducer} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {ActionNames as CommonActionNames} from './common-actions';

const CurrencyReducer = createReducer([], {
    [CommonActionNames.FETCH_CURRENCY_SUCCESS]: (prevState, action) => {
        action.payload.error = null;
        return action.payload;
    },
    [CommonActionNames.FETCH_CURRENCY_FAILURE]: (prevState, action) => {
        const currencies = [];
        currencies.error = action.payload.message;
        return currencies;
    }
});

const SelectedCurrentyReducer = createReducer({base: 'USD'}, {
    [CommonActionNames.SELECT_CURRENCY]: (prevState, action) => {
        return action.payload;
    }
})


export default combineReducers({
    currencies: CurrencyReducer,
    selectedCurrency: SelectedCurrentyReducer
});