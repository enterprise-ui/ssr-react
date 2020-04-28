import '@babel/polyfill';
import {LoadableComponent} from '@loadable/component';
import compression from 'compression';
import express, {Request, Response} from 'express';
import {StaticRouterContext} from 'react-router';
import {matchRoutes} from 'react-router-config';
import {IMatchedRouteLoadable, TRouteComponent} from './client/Models';
import {routes as Routes} from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './store/createStore';

const app = express();

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
}

app.use(
    compression({
        level: 2,
        filter: shouldCompress,
    })
);

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('*', (req: Request, res: Response) => {
    const params = req.params[0].split('/');
    const id = params[2];

    const store = createStore({isServer: true, req});

    const routes: IMatchedRouteLoadable[] = matchRoutes(Routes, req.path);

    console.log(routes);

    const preloadAll: Promise<TRouteComponent>[] = routes
        .map(({route: {component}}) =>
            (component as LoadableComponent<any>).load ? (component as LoadableComponent<any>).load() : new Promise(() => component)
        )
        .map((promise) => {
            if (promise) {
                return new Promise((resolve, reject) => {
                    promise.then(resolve).catch(reject);
                });
            }
            return null;
        });

    console.log(preloadAll);

    Promise.all(preloadAll).then((components) => {
        const promises = components
            .map((component) => {
                console.log(component);
                return component.getInitialProps
                    ? component.getInitialProps({
                          store,
                          props: {match: {params: {id}}, isServer: true},
                      })
                    : null;
            })
            .map((promise) => {
                if (promise) {
                    return new Promise((resolve, reject) => {
                        promise.then(resolve).catch(reject);
                    });
                }
                return null;
            });

        Promise.all(promises).then(() => {
            const context: StaticRouterContext = {};
            const content = renderer(req, store, context);

            if (context.statusCode === 404) {
                res.status(404);
            }

            res.send(content);
        });
    });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
