import React from 'react';
import { Grid } from '@material-ui/core';

const AppNav = () => (<Grid spacing={3} container>
    <Grid item sm={2}>Lumin</Grid>
    <Grid item sm={8}>
      <ul>
        <li>Shop</li>
        <li>Learn</li>
      </ul>
    </Grid>
    <Grid item sm={2}>
      <ul>
        <li>Account</li>
        <li>Learn</li>
      </ul>
    </Grid>
  </Grid>);

export default AppNav;