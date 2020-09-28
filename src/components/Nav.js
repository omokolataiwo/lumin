import React from 'react';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(() => {
  return {
    container: {
      display: 'flex',
      flexBasis: '100%',
      borderBottom: '1px solid #ccc',
      fontSize: 11,
      alignItems: 'center',
      fontWeight: 600,
      padding: '21px 55px',
      '& ul': {
        listStyle: 'none',
        margin: 0,
      },
      '& li': {
        display: 'inline-block',
        margin: 'auto 10px'
      }
    },
    logo: {
      flexGrow: 1,
      fontSize: 30,
      letterSpacing: 20,
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 100,
    },
    nav: {
      flexGrow: 1,
    },
    account: {
      flexGrow: 8,
      textAlign: 'end',
      marginRight: '29px',
      '& li:last-child sup': {
        position: 'relative',
        top: '-11px',
      },
      '& li:last-child svg': {
        position: 'relative',
        top: '5px',
      }
    }
  }
})

const AppNav = () => {
  const classes = useStyle();

  return (<div className={classes.container}>
    <div className={classes.logo}>LUMIN</div>
    <div className={classes.nav}>
      <ul>
        <li>Shop</li>
        <li>Learn</li>
      </ul>
    </div>
    <div className={classes.account}>
      <ul>
        <li>Account</li>
        <li><ShoppingCartOutlinedIcon /><sup>30</sup></li>
      </ul>
    </div>
  </div>)
};

export default AppNav;