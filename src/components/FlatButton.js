import React from 'react';
import propTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  button: {
    display: 'block',
    backgroundColor: '#4b5547',
    border: '1px solid #4b5547',
    color: 'white',
    height: 48,
    padding: '0 30px',
    width: '100%',
    marginTop: '20px',
    borderRadius: 0,
    fontSize: 11,
    '&:hover': {
      color: '#4b5547'
    }
  },
  plainButton: {
    backgroundColor: '#fff',
    color: '#4b5547'
  },
});
const FlatButton = ({ children, color, handleOnClick }) => {
  const classes = useStyles();

  return (
    <Button
      onClick={handleOnClick}
      className={clsx(classes.button, {
        [classes.plainButton]: color === 'plain',
      })}>{children}</Button>
  );
};

FlatButton.propType = {
  handleOnClick: propTypes.func.isRequired,
  children: propTypes.func.isRequired,
  color: propTypes.string.isRequired,
}

export default FlatButton;
