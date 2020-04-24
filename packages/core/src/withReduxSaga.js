import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import { END } from 'redux-saga';

function withReduxSaga(BaseComponent) {
  const EnhancedComponent = props => {
    const store = useStore();

    useEffect(() => {
      EnhancedComponent.getInitialProps({ props, store });
    }, [props, store]);

    console.log('withReduxSaga.render');
    return <BaseComponent {...props} />;
  };

  EnhancedComponent.displayName = `withReduxSaga.(${BaseComponent.displayName ||
    BaseComponent.name ||
    'BaseComponent'})`;

  EnhancedComponent.getInitialProps = async ({ props, store }) => {
    console.log('withReduxSaga.getInitialProps');
    let pageProps = {};

    if (BaseComponent.getInitialProps) {
      pageProps = await BaseComponent.getInitialProps(store, props);
    }

    if (props.isServer) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
      console.log('withReduxSaga.dispatch END');
    }

    console.log('withReduxSaga.sagaTask Done');

    return { ...pageProps, isServer: props.isServer };
  };

  return EnhancedComponent;
}

export default withReduxSaga;
