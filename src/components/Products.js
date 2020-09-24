import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const PRODUCTS_QUERY = gql`
  query ProductsQuery {
    products{
    id
    title
    image_url
  }
}
`;


export default class Products extends Component {
  render() {
    return (
      <div>
        Products
        <Query query={PRODUCTS_QUERY}>
          {
            ({ loading, error, data }) => {
              if (loading) return 'Loading';
              if (error) console.log(error);

              console.log(data);
              return <h6>Test</h6>
            }
          }
        </Query>
      </div>
    )
  }
}