import React from 'react';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { currencyFormat } from '../constants';
import FlatButton from './FlatButton';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#e2e6e3',
    paddingTop: 80,
  },
  productCard: {
    display: 'flex',
    flexBasis: '28%',
    padding: '2%',
    flexDirection: 'column',
    alignSelf: 'baseline',
    textAlign: 'center',
    '@media (max-width:768px)': {
      flexBasis: '38%',
    }
  },
  pImageWrapper: {
    '& img': {
      maxWidth: '70%',
      maxHeight: 150,
    }
  },
  pInfo: {
    marginTop: 'auto',
    '& button': {
      width: '40%',
      display: 'inline',
    }
  },
  center: {
    margin: 'auto'
  }
});


const Products = ({ products, onAddToCart, error, loading, selectedCurrency }) => {
  const classes = useStyles();

  if (loading) return <p className={classes.center}>Loading...</p>;
  if (error) return <p className={classes.center}>Something went wrong</p>;

  return (
    <div className={classes.container}>
      {products.map(product => (
        <div className={classes.productCard} key={product.id}>
          <div className={classes.pImageWrapper}>
            <img src={product.image_url} alt={product.title} />
          </div>
          <div className={classes.pInfo}>
            <p>{product.title}</p>
            <p>From {currencyFormat(product.price, selectedCurrency)}</p>
            <FlatButton handleOnClick={(evt) => onAddToCart(product, evt)}>Add to Cart</FlatButton>
          </div>
        </div>
      ))}
    </div>
  );
}

Products.propType = {
  onAddToCart: propTypes.func.isRequired,
  selectedCurrency: propTypes.string.isRequired,
  error: propTypes.string.isRequired,
  products: propTypes.arrayOf(propTypes.shape({})).isRequired,
  loading: propTypes.string.isRequired,
}

export default Products;
