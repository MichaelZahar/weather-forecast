import 'babel-polyfill';
import 'promise-polyfill';
import 'fetch-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import { configureStore } from './store/configureStore';
import { defaultCities } from './constants';
import { getCities } from './utils/localStorage';

import '../styles/index.styl';

const store = configureStore({
  cities: {
    items: getCities() || defaultCities
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
