import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexBasis: '100%',
    margin: '60px auto',
    '& div': {
      flexGrow: 1
    },
    '& div:first-child': {
      marginLeft: 120,
      fontSize: 11,
      '& h2': {
        fontSize: 45,
        fontWeight: 100,
        marginBottom: 12,
        fontFamily: "'David Libre', serif",
      }
    },
    '& div:last-child': {

    },
  },
});

const AppHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <h2>All Products</h2>
        <p>A 360<sup>o</sup> look at Lumin</p>
      </div>
      <div>
      </div>
    </div>
  )
};

export default AppHeader;
