import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Products from './components/Products';
import Nav from './components/Nav';
import Header from './components/Header';
import Drawer from './components/Drawer';
import DrawerProductContent from './components/DrawerProductContent';
import { IS_EMPTY, ZERO_ITEM } from './constants';

const theme = createMuiTheme({
  palette: {
  },
})

const useStyles = makeStyles(() => {
  return {
    root: {
      flexGrow: 1,
    },
    cartDrawer: {
      margin: '26px',
      backgroundColor: '#f2f3f0',
    }
  }
});

export const PRODUCT_QUERY = gql`
  query ProductsQuery ($currency: Currency) {
    products{
    id
    title
    image_url
    price(currency: $currency)
  },
  currency
}
`;

function App() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    drawer: false,
    cart: {},
    selectedCurrency: 'USD'
  });

  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: { currency: state.selectedCurrency },
    onCompleted: ({ products }) => {
      const { cart } = state;

      Object.keys(cart).forEach(productId => {
        const updatedProduct = products.find(product => parseInt(product.id) === parseInt(productId))

        if (!updatedProduct) {
          throw Error('Cart item missing in products.')
        }
        cart[productId]['price'] = updatedProduct.price
      });

      setState({ ...state, cart });
    }
  });

  const { products, currency } = data || {};

  const toggleDrawer = (open) => (event) => {
    let { cart } = state;

    if (!open) {
      return setState({ ...state, drawer: open, cart: removeZeroItems(cart) });
    }
    return setState({ ...state, drawer: open });
  };

  const handleRemoveFromCart = (productId) => {
    const { [productId]: removedProduct, ...cart } = state.cart;
    let nState = { ...state, cart };

    if (Object.keys(cart).length === IS_EMPTY) {
      nState.drawer = false;
    }
    return setState({ ...state, ...nState });
  }

  const removeZeroItems = (cart) => {
    return Object.entries(cart).reduce((accCart, [id, product]) => {
      if (product.qty === ZERO_ITEM) {
        const { [id]: emptyProduct, ...rest } = accCart;
        return rest;
      }
      return accCart;
    }, cart);
  }

  const addToCart = ({ id, ...restProduct }, evt) => {
    const { cart } = state;
    const product = cart[id] || { ...restProduct, qty: 0 };
    product.qty += 1;

    setState({ ...state, drawer: true, cart: { ...cart, [id]: product } });
  };

  const handleIncrement = (id) => {
    const { cart } = state;
    const product = cart[id];
    product.qty += 1;

    setState({ ...state, cart: { ...cart, [id]: product } });
  };

  const handleDecrement = (id) => {
    const { cart } = state;
    const product = cart[id];
    product.qty -= 1;

    const nState = { ...state, cart: { ...cart, [id]: product } };

    if (product.qty === 0) {
      const { [id]: removedProduct, ...cart } = nState.cart;
      nState.cart = cart;

      if (Object.keys(cart).length === IS_EMPTY) {
        nState.drawer = false;
      }
    }

    setState({ ...state, ...nState });
  };

  const handleCurrencyChanged = (evt) => {
    const { target: { value: selectedCurrency } } = evt;
    setState({ ...state, selectedCurrency });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        {currency && <Drawer open={state.drawer} onToggleDrawer={toggleDrawer}>
          <DrawerProductContent
            selectedCurrency={state.selectedCurrency}
            currency={currency}
            cart={state.cart}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            handleCurrencyChanged={handleCurrencyChanged}
            handleCloseDrawer={toggleDrawer}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        </Drawer>}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Nav hello="123" />
          </Grid>
          <Header />
          <Products onToggleDrawer={toggleDrawer} onAddToCart={addToCart} products={products} error={error} loading={loading} selectedCurrency={state.selectedCurrency} />
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
