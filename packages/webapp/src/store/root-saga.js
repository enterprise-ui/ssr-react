import { Sagas } from '@poc/articles';
import { fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield fork(Sagas);
}
