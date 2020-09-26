import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import SelectInput from './SelectInput';
import GroupButton from './GroupButton';
import { Button, Divider } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { CURRENCY_SYMBOL } from '../constants';

const useStyles = makeStyles(() => ({
  drawerHeader: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  nav: {
    flex: '30%',
  },
  backBtn: {
    width: 25,
    height: 25,
    borderRadius: '50%',
    border: '1px solid',
  },
  headerLabel: {
    flex: '70%'
  },
  closeBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  productCard: {
    border: '1px solid'
  },
  productImage: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& img': {
      maxWidth: 50,
      maxHeight: 60,
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
    maxHeight: 1000,
    overflow: 'scroll'
  },
}));

const DrawerProductContent = ({ handleDecrement, handleIncrement, cart, currency, selectedCurrency, handleCurrencyChanged, handleCloseDrawer, handleRemoveFromCart }) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.list)}
      role="presentation"
    >
      <div className={classes.drawerHeader}>
        <div className={classes.nav}>
          <div className={classes.backBtn}><NavigateBeforeIcon onClick={handleCloseDrawer(false)} /></div>
          <SelectInput items={currency} label={selectedCurrency} value={selectedCurrency} handleChange={handleCurrencyChanged} />
        </div>
        <div className={classes.headerLabel}>Your Cart</div>
      </div>

      {Object.entries(cart).map(([id, product]) => {
        return (
          <div key={id} className={classes.productCard}>
            <div className={classes.closeBtn} onClick={() => handleRemoveFromCart(id)}>X</div>
            <div>{product.title}</div>
            <div className={classes.productImage}>
              <img src={product.image_url} alt={product.title} />
            </div>
            <div className={classes.productCardFooter}>
              <div className={classes.qtyUpdater}>
                <GroupButton handleDecrement={handleDecrement} handleIncrement={handleIncrement} id={id} count={product.qty} />
              </div>
              <div className={classes.productPrice}>
                {CURRENCY_SYMBOL[selectedCurrency] || selectedCurrency} {product.price}
              </div>
            </div>
          </div>
        )
      })}
      <Divider />
      <div>
        <div>Subtotal</div>
        <div>200</div>
      </div>
      <div>
        <Button>Make this a subscription (save 20%)</Button>
      </div>
      <div>
        <Button>proceed to checkout</Button>
      </div>
    </div>
  );
}

export default DrawerProductContent;