import {Store} from 'redux';
import {Task} from 'redux-saga';

export interface IStoreSaga extends Store {
    sagaTask?: Task;
}

export interface IAppState {
    domainExampleApp: any;
}
