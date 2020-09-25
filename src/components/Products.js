import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Button } from '@material-ui/core';

export const PRODUCT_QUERY = gql`
  query ProductsQuery {
    products{
    id
    title
    image_url
  }
}
`;

const Products = ({ onToggleDrawer }) => {
  const { loading, error, data } = useQuery(PRODUCT_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  const { products } = data;

  return (
    <Grid container item xs={12}>
      {products.map(product => (
        <Grid item xs={6} md={4} key={product.id}>
          <p>Product ID</p>
          <Button onClick={onToggleDrawer(true)}>Open</Button>
        </Grid>
      ))}
    </Grid>
  );
}

export default Products;
