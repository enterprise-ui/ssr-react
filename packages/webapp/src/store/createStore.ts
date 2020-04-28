import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from '../client/reducers';
import Sagas from './rootSaga';
import {IAppState} from './Models';
import {IStoreSaga} from './Models';

const initialState: IAppState = {
    domainExampleApp: {},
};

export default ({isServer = false, req = null}, preloadedState: IAppState = initialState) => {
    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();

    const store: IStoreSaga = createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(sagaMiddleware)));

    if (req || !isServer) {
        store.sagaTask = sagaMiddleware.run(Sagas);
    }

    return store;
};
