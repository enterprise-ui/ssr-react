import '@babel/polyfill';
import {loadableReady} from '@loadable/component';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import {BrowserRouter} from 'react-router-dom';
import createStore from '../store/createStore';
import {routes} from './Routes';

const store = createStore(window.__PRELOADED_STATE__, {});

loadableReady(() => {
    ReactDOM.hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <div>{renderRoutes(routes)}</div>
            </BrowserRouter>
        </Provider>,
        document.querySelector('#root')
    );
});
