import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Products, { PRODUCT_QUERY } from './Products';

const mocks = [
  {
    request: {
      query: PRODUCT_QUERY,
    },
    result: {
      data: {
        products: { id: '1', title: 'Buck', image_url: 'bulldog' },
      },
    }
  },
  {
    request: {
      query: PRODUCT_QUERY,
    },
    error: new Error('somethine went wrong'),
  },
];

test('renders app', async () => {
  
  const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Products />
      </MockedProvider>
    );
  const heading = getByText('Loading...');
  expect(heading).toBeInTheDocument();
  await new Promise(resolve => setTimeout(resolve, 0)); 
  const title = getByText('Buck');
  expect(title).toBeInTheDocument();
});
