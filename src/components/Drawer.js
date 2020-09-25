import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SelectInput from './SelectInput';
import GroupButton from './GroupButton';

const useStyles = makeStyles({
  list: {
    width: 500,
  },
});

const AppDrawer = ({ onToggleDrawer, open, handleDecrement, handleIncrement, children }) => {
  const classes = useStyles();
  const drawerContent = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
    >
      Nav Your Cart
      <SelectInput />
      <GroupButton handleDecrement={handleDecrement} handleIncrement={handleIncrement} />
    </div>
  );

  return (
    <div>
      <Drawer anchor='right' open={open} onClose={onToggleDrawer(false)}>
        {children}
      </Drawer>
    </div>
  );
}

export default AppDrawer;