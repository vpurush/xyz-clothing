import React from 'react';
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
            product={{
                price: {}
            }}
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
            product={{
                price: {}
            }}
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
            product={{
                price: {}
            }}
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