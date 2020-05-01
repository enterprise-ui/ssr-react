import {IStore} from '@ssr-react/core';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from '../client/reducers';
import Sagas from './rootSaga';
import {IAppState} from './Models';

const initialState: IAppState = {
    domainExampleApp: {},
};

export default (preloadedState: IAppState = initialState) => {
    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();

    const store: IStore = createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(sagaMiddleware)));

    store.sagaTask = sagaMiddleware.run(Sagas);

    return store;
};
