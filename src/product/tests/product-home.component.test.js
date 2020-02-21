import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

jest.mock('../product.actions.js');

const createMockStore = configureStore([]);
const mockStore = createMockStore({
    products: [],
    common: {
        currencies: [],
        selectedCurrency: {base: 'USD'}
    }
});

import ProductHome from '../product-home.component';
import ProductActions from '../product.actions';


test('FetchProducts method must be invoked by componentDidMount', () => {
    mount(
        <Provider store={mockStore}>
            <ProductHome></ProductHome>
        </Provider>
    );
    expect(ProductActions.FetchProducts).toHaveBeenCalled();
});
