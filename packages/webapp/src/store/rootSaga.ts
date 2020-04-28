import {DomainSagas} from '@ssr-react/domain-example';
import {fork} from 'redux-saga/effects';

export default function* rootSaga() {
    yield fork(DomainSagas);
}
