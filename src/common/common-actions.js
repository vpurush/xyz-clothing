import {createAction} from '@reduxjs/toolkit';
import CommonService from './common.service';

const FETCH_CURRENCY_START = 'common/currency/fetch_start';
const FETCH_CURRENCY_SUCCESS = 'common/currency/fetch_success';
const FETCH_CURRENCY_FAILURE = 'common/currency/fetch_failure';

const FetchCurrencyStart = createAction(FETCH_CURRENCY_START);
const FetchCurrencySuccess = createAction(FETCH_CURRENCY_SUCCESS);
const FetchCurrencyFailure = createAction(FETCH_CURRENCY_FAILURE);

const FetchCurrency = () => {
    return (dispatch) => {
        dispatch(FetchCurrencyStart());
        CommonService.FetchCurrencies().then((currencies) => {
            dispatch(FetchCurrencySuccess(currencies));
            dispatch(SelectCurrency(currencies[0]));
        }).catch(err => {
            dispatch(FetchCurrencyFailure(err.message));
        });
    }
};

const SELECT_CURRENCY = 'common/selected_currency';
const SelectCurrency = createAction(SELECT_CURRENCY);

export const ActionNames = {
    FETCH_CURRENCY_START,
    FETCH_CURRENCY_SUCCESS,
    FETCH_CURRENCY_FAILURE,
    SELECT_CURRENCY
};

export default {
    FetchCurrency,
    SelectCurrency
}
