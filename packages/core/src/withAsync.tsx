import React, {useEffect} from 'react';
import {useStore} from 'react-redux';
import {END} from 'redux-saga';
import {IReactFunctionComponent, TReactComponentType} from './Models';
import {isInitialRender, setInitialRender} from './Utils';

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
        console.log('withAsync.getInitialProps');
        const {isServer} = props;
        let staticProps = {};

        if (!isInitialRender(isServer)) {
            if (TargetComponent.getInitialProps) {
                staticProps = await TargetComponent.getInitialProps({store, props});
            }

            if (isServer) {
                store.dispatch(END);
                const resp = await store.sagaTask.toPromise();
                console.log();
            }
        }

        setInitialRender(isServer);

        return {...staticProps, ...props};
    };

    return EnhancedComponent as C;
}

export default withAsync;
