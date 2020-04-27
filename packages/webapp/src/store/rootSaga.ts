import {Sagas} from '@ssr-react/domain-example';
import {fork} from 'redux-saga/effects';

export default function* rootSaga() {
    yield fork(Sagas);
}
