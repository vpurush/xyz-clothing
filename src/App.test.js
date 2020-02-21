import React from 'react';
import { render } from '@testing-library/react';
jest.mock('./product/product.service.js');
jest.mock('./common/common.service.js');
jest.mock('./product/product-home.component', () => {
  return jest.fn(() => null);
});
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const companyNameElm = getByText(/XYZ Clothing/i);
  expect(companyNameElm).toBeInTheDocument();
});
