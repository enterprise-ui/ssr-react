/* eslint-disable no-underscore-dangle */
// Startup point for client-side application
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Routes from './Routes';
import createStore from '../store/createStore';

// eslint-disable-next-line import/order
import { loadableReady } from '@loadable/component';

const store = createStore(window.__PRELOADED_STATE__, {});

loadableReady(() => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <div>{renderRoutes(Routes)}</div>
      </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
  );
});
