import withReduxSaga from './withReduxSaga';

function Page(BaseComponent) {
  return withReduxSaga(BaseComponent);
}

export default Page;
