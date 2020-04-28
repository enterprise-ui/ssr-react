import {DomainReducers} from '@ssr-react/domain-example';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
    domainExampleApp: DomainReducers,
});
