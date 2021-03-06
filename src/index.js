import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react'
import store from './store.js';
import './styles/index.scss';
// require('dotenv').config()

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
document.querySelector('#root'));
