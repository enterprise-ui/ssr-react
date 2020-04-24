import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { Reducers } from '@poc/articles';
import Sagas from './root-saga';

export default (preloadedState, { isServer = false, req = null }) => {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    Reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(Sagas);
  }

  return store;
};
