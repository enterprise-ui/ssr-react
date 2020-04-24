/* eslint-disable no-unused-vars */
import '@babel/polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import compression from 'compression';
import renderer from './helpers/renderer';
import createStore from './store/createStore';
import Routes from './client/Routes';

const app = express();

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
}

app.use(
  compression({
    level: 2, // set compression level from 1 to 9 (6 by default)
    filter: shouldCompress // set predicate to determine whether to compress
  })
);

const port = process.env.PORT || 3001;

// To be able to serve static files
app.use(express.static('public'));

app.get('*', (req, res) => {
  const params = req.params[0].split('/');
  const id = params[2];

  const store = createStore({}, { isServer: true, req });

  const routes = matchRoutes(Routes, req.path);

  const preloadAll = routes
    .map(({ route: { component } }) => (component.load ? component.load() : component))
    .filter(route => route);

  Promise.all(preloadAll).then(components => {
    const promises = components
      .map(component => {
        const loadable = component.default || component;
        return loadable.getInitialProps
          ? loadable.getInitialProps({
              store,
              props: { match: { params: { id } }, isServer: true }
            })
          : null;
      })
      .map(promise => {
        if (promise) {
          return new Promise((resolve, reject) => {
            promise.then(resolve).catch(reject);
          });
        }
        return null;
      });

    Promise.all(promises).then(() => {
      const context = {};
      const content = renderer(req, store, context);

      if (context.notFound) {
        res.status(404);
      }

      res.send(content);
    });
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
