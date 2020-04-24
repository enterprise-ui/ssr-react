import React from 'react';
import {Task} from 'redux-saga';
import {Store} from 'redux';

interface IStaticProps {
    isServer?: boolean;
}

export interface IStore extends Store {
    sagaTask?: Task;
}

export interface IContext<TProps> {
    props?: IStaticProps & TProps;
    store: IStore;
}

export type TGetInitialPropsMethod<TProps> = (ctx: IContext<TProps>) => Promise<IStaticProps>;

export type TReactComponentType<TProps> = React.ComponentType<TProps> & {
    getInitialProps?: TGetInitialPropsMethod<TProps>;
};

export interface IReactFunctionComponent<TProps> extends React.FunctionComponent<TProps> {
    getInitialProps?: TGetInitialPropsMethod<TProps>;
}
