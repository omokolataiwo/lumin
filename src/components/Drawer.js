import React from 'react';
import Drawer from '@material-ui/core/Drawer';

const AppDrawer = ({ onToggleDrawer, open, handleDecrement, handleIncrement, children }) => {
  return (
    <div>
      <Drawer anchor='right' open={open} onClose={onToggleDrawer(false)}>
        {children}
      </Drawer>
    </div>
  );
}

export default AppDrawer;