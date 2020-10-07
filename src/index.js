import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

import {
  BrowserRouter as Router
} from "react-router-dom";


import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
})

const authLink = setContext((_, { headers }) => {
  const loginToken = localStorage.getItem('login-token')
  return {
    headers: {
      ...headers,
      authorization: loginToken ? `Bearer ${loginToken}` : ''
    }
  }
})


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
