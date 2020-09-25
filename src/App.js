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

const theme = createMuiTheme({
  palette: {
  },
})

const useStyles = makeStyles(() => {
  return {
    root: {
      flexGrow: 1,
    },
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

  const { loading, error, data } = useQuery(PRODUCT_QUERY, { variables: { currency: state.selectedCurrency } });

  const { products, currency } = data || {};

  const toggleDrawer = (open) => (event) => {
    setState({ ...state, drawer: open });
  };

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

    if (product.qty === 0) return;

    product.qty -= 1;
    setState({ ...state, cart: { ...cart, [id]: product } });
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
            handleIncrement={handleIncrement} />
        </Drawer>}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Nav />
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Header />
            </Grid>
          </Grid>
          <Products onToggleDrawer={toggleDrawer} onAddToCart={addToCart} products={products} error={error} loading={loading} selectCurrency={state.selectedCurrency} />
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
