import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

jest.mock('../../product.actions.js');

const createMockStore = configureStore([]);
const mockStore = createMockStore({
    products: [],
    common: {
        currencies: [],
        selectedCurrency: {base: 'USD'}
    }
});

import {EditProduct} from '../edit-product.component';

test('Validate method set error on name field', () => {
    const editProductInstance = shallow(
        <EditProduct 
            currencies={[]}
            match={{params: {id: "1"}}}>
        </EditProduct>
    ).instance();
    let evt = {
        target: {
            id: 'name',
            value: "ab"
        }
    };
    editProductInstance.validate(evt);
    expect(editProductInstance.state.errors.name).toBeDefined();
    evt = {
        target: {
            id: 'name',
            value: "abc"
        }
    };
    editProductInstance.validate(evt);
    expect(editProductInstance.state.errors.name).toBeNull();
});

test('Validate method set error on id field', () => {
    const editProductInstance = shallow(
        <EditProduct 
            allProducts={[]}
            currencies={[]}
            match={{params: {id: "1"}}}>
        </EditProduct>
    ).instance();
    let evt = {
        target: {
            id: 'id',
            value: ""
        }
    };
    editProductInstance.validate(evt);
    expect(editProductInstance.state.errors.name).toBeNull();
});

test('Validate method set error on amount field', () => {
    const editProductInstance = shallow(
        <EditProduct 
            allProducts={[]}
            currencies={[]}
            match={{params: {id: "1"}}}>
        </EditProduct>
    ).instance();
    let evt = {
        target: {
            id: 'amount',
            value: "0"
        }
    };
    editProductInstance.validate(evt);
    expect(editProductInstance.state.errors.amount).toBeNull();
});