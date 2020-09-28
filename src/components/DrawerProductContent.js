import React from 'react';
import propTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import SelectInput from './SelectInput';
import GroupButton from './GroupButton';
import FlatButton from './FlatButton';

import { Divider } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { currencyFormat } from '../constants';

const useStyles = makeStyles(() => ({
  nav: {
    marginBottom: 12,
    '& svg': {
      border: '1px solid',
      borderRadius: '50%'
    },
    '& span': {
      position: 'relative',
      top: '-6px',
      marginLeft: '228px',
    }
  },
  closeBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  productCard: {
    backgroundColor: '#fff',
    marginTop: '25px',
    padding: '10px 15px',
  },
  productTitle: {
    fontSize: 14,
  },
  productImage: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '15px 50px',
    '& img': {
      maxWidth: 50,
      maxHeight: 60,
      minWidth: 50,
      minaHeight: 60,
    }
  },
  productCardFooter: {
    display: 'flex',
  },
  productPrice: {
    flexGrow: 1,
  },
  qtyUpdater: {
    flexGrow: 1,
  },
  list: {
    width: 550,
    padding: 20,
    backgroundColor: '#f2f3f0',
    height: '100%',
    position: 'relative'
  },
  drawerFooter: {
    position: 'absolute',
    bottom: 0,
    width: '93%'
  },
  divider: {
    margin: '189px auto 20px auto',
  },
  subTotal: {
    display: 'flex',
    '& div:last-child': {
      flexGrow: 1,
      textAlign: 'end'
    },
    '& div:first-child': {
      flexGrow: 1,
    }
  },
  drawerContent: {
    maxHeight: '70%',
    overflow: 'scroll',
  }
}));


const DrawerProductContent = ({ handleDecrement, handleIncrement, cart, currency, selectedCurrency, handleCurrencyChanged, handleCloseDrawer, handleRemoveFromCart }) => {
  const classes = useStyles();

  const calcSubTotal = (cart) => {
    return Object.values(cart).reduce((subTotal, product) => {
      return subTotal + parseInt(product.price, 10) * product.qty;
    }, 0);
  }

  return (
    <div
      className={clsx(classes.list)}
      role="presentation"
    >
      <div className={classes.drawerHeader}>
        <div className={classes.nav}>
          <NavigateBeforeIcon onClick={handleCloseDrawer(false)} />
          <span>Your Cart</span>
        </div>
        <div>
          <SelectInput items={currency} label={selectedCurrency} value={selectedCurrency} handleChange={handleCurrencyChanged} />
        </div>
      </div>
      <div className={classes.drawerContent}>
        {Object.entries(cart).map(([id, product]) => {
          return (
            <div key={id} className={classes.productCard}>
              <div className={classes.closeBtn} onClick={() => handleRemoveFromCart(id)}>X</div>
              <div className={classes.productTitle}>{product.title}</div>
              <div className={classes.productImage}>
                <img src={product.image_url} alt={product.title} />
              </div>
              <div className={classes.productCardFooter}>
                <div className={classes.qtyUpdater}>
                  <GroupButton handleDecrement={handleDecrement} handleIncrement={handleIncrement} id={id} count={product.qty} />
                </div>
                <div className={classes.productPrice}>
                  {currencyFormat(product.price, selectedCurrency)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className={classes.drawerFooter}>
        <Divider className={classes.divider} />
        <div className={classes.subTotal}>
          <div>Subtotal</div>
          <div>
            {currencyFormat(calcSubTotal(cart), selectedCurrency)}</div>
        </div>
        <FlatButton handleOnClick={() => { }} color="plain">MAKE THIS A SUBSCRIPTION (SAVE 20%)</FlatButton>
        <FlatButton handleOnClick={() => { }}>PROCEED TO CHECKOUT</FlatButton>
      </div>
    </div>
  );
}

DrawerProductContent.propType = {
  selectedCurrency: propTypes.string.isRequired,
  currency: propTypes.arrayOf(propTypes.string).isRequired,
  cart: propTypes.shape({}).isRequired,
  handleDecrement: propTypes.func.isRequired,
  handleIncrement: propTypes.func.isRequired,
  handleCurrencyChanged: propTypes.func.isRequired,
  handleCloseDrawer: propTypes.func.isRequired,
  handleRemoveFromCart: propTypes.func.isRequired,
}
export default DrawerProductContent;
