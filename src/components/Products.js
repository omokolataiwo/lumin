import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CURRENCY_SYMBOL } from '../constants';

const useStyles = makeStyles({
  products: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  productCard: {
    display: 'flex',
    flexBasis: '28%',
    padding: '2%',
    flexDirection: 'column',
    alignSelf: 'baseline',
    textAlign: 'center'
  },
  pImageWrapper: {
    '& img': {
      maxWidth: '70%',
      maxHeight: 150,
    }
  },
  pInfo: {
    marginTop: 'auto',
  },
});


const Products = ({ products, onAddToCart, error, loading, selectedCurrency }) => {
  const classes = useStyles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <Grid className={classes.products}>
      {products.map(product => (
        <div className={classes.productCard} key={product.id}>
          <div className={classes.pImageWrapper}>
            <img src={product.image_url} alt={product.title} />
          </div>
          <div className={classes.pInfo}>
            <p>{product.title}</p>
            <p>From {CURRENCY_SYMBOL[selectedCurrency] || selectedCurrency} {product.price}</p>
            <Button onClick={(evt) => onAddToCart(product, evt)}>Add to Cart</Button>
          </div>
        </div>
      ))}
    </Grid>
  );
}

export default Products;
