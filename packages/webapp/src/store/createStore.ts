import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import Reducers from '../client/reducers';
import Sagas from './rootSaga';
import {IAppState} from './Models';
import {IStoreSaga} from './Models';

export default (preloadedState: IAppState, {isServer = false, req = null}) => {
    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();

    const store: IStoreSaga = createStore(Reducers, preloadedState, composeEnhancers(applyMiddleware(sagaMiddleware)));

    if (req || !isServer) {
        store.sagaTask = sagaMiddleware.run(Sagas);
    }

    return store;
};
