import {Reducers as articles} from '@ssr-react/domain-example';
import {combineReducers} from 'redux';

export default combineReducers({
    domainExampleApp: articles,
});
