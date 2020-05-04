import React, {useEffect} from 'react';
import {useStore} from 'react-redux';
import {END} from 'redux-saga';
import {IReactFunctionComponent, TReactComponentType} from './Models';
import {isInitialRender, qs2json, setInitialRender} from './Utils';

function withAsync<TProps, C extends TReactComponentType<TProps>>(TargetComponent: C): C {
    const EnhancedComponent: IReactFunctionComponent<TProps> = (props) => {
        const store = useStore();
        const Component = TargetComponent as TReactComponentType<TProps>;

        useEffect(() => {
            EnhancedComponent.getInitialProps({props, store});
        }, [props, store]);

        return <Component {...props} />;
    };

    EnhancedComponent.displayName = `withAsync.(${TargetComponent.displayName || TargetComponent.name || 'TargetComponent'})`;

    EnhancedComponent.getInitialProps = async ({props, store}) => {
        const {isServer, location} = props;
        const routeProps = {queryParams: qs2json(location.search)};
        let staticProps = {};

        if (!isInitialRender(isServer)) {
            if (TargetComponent.getInitialProps) {
                staticProps = await TargetComponent.getInitialProps({store, props: {...props, ...routeProps}});
            }

            if (isServer) {
                store.dispatch(END);
                await store.sagaTask.toPromise();
            }
        }

        setInitialRender(isServer);

        return {...staticProps};
    };

    return EnhancedComponent as C;
}

export default withAsync;
