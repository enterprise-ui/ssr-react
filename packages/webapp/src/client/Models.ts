import {LoadableComponent} from '@loadable/component';
import {TReactComponentType} from '@ssr-react/core';
import {MatchedRoute} from 'react-router-config';
import {RouteProps} from 'react-router-dom';

export type TRouteComponent = TReactComponentType<any> | (LoadableComponent<any> & TReactComponentType<any>);

export interface IRoute extends RouteProps {
    component?: TRouteComponent;
    routes?: IRoute[];
}

export interface IMatchedRouteLoadable extends MatchedRoute<{}> {
    route: IRoute;
}
