import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Products from './components/Products';
import Nav from './components/Nav';
import Header from './components/Header';
import Drawer from './components/Drawer';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#ff0000' },
  },
})

const useStyles = makeStyles(() => {
  return {
    root: {
      flexGrow: 1,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  }
});

const client = new ApolloClient({
  uri: 'https://pangaea-interviews.now.sh/api/graphql'
});

function App() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    drawer: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, drawer: open });
  };


  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Drawer open={state.drawer} onToggleDrawer={toggleDrawer} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Nav />
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Header />
              </Grid>
            </Grid>
            <Products onToggleDrawer={toggleDrawer} />
          </Grid>
        </div>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;
