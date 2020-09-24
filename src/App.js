import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Products from './components/Products';

const client = new ApolloClient({
  uri: 'https://pangaea-interviews.now.sh/api/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">Heading</header>
        <Products />
      </div>
    </ApolloProvider>
  );
}

export default App;
