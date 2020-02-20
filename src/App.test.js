import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
jest.mock('./product/product.service.js');

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const companyNameElm = getByText(/XYZ Clothing/i);
  expect(companyNameElm).toBeInTheDocument();
});
