import React from 'react';
import { Grid } from '@material-ui/core';

const AppHeader = () => (
  <Grid spacing={3} container>
    <Grid item sm={8}>
      <h2>All Products</h2>
      <p>A 360<sup>o</sup> look at Lumin</p>
    </Grid>
    <Grid item sm={4}> <input /> </Grid>
  </Grid>
);

export default AppHeader;
