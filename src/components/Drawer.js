import React from 'react';
import propTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';

const AppDrawer = ({ onToggleDrawer, open, children }) => {
  return (
    <div>
      <Drawer anchor='right' open={open} onClose={onToggleDrawer(false)}>
        {children}
      </Drawer>
    </div>
  );
}

AppDrawer.propType = {
  onToggleDrawer: propTypes.func.isRequired,
  children: propTypes.func.isRequired,
  open: propTypes.bool.isRequired,
}

export default AppDrawer;
