import '@babel/polyfill';
import {LoadableComponent} from '@loadable/component';
import compression from 'compression';
import express, {NextFunction, Request, Response} from 'express';
import {StaticRouterContext} from 'react-router';
import {matchRoutes} from 'react-router-config';
import {IMatchedRouteLoadable, TRouteComponent} from './client/Models';
import {paths, routes as Routes} from './client/Routes';
import renderer from './renderer';
import createStore from './store/createStore';

const app = express();

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
}

function handleRequest(req: Request, res: Response, next: NextFunction) {
    const store = createStore();

    const routes: IMatchedRouteLoadable[] = matchRoutes(Routes, req.path);

    const preloadAll: Promise<TRouteComponent>[] = routes.map(({route: {component}}) => {
        const loadable = component as LoadableComponent<any>;

        return loadable.load ? loadable.load() : new Promise((resolve) => resolve(loadable));
    });

    const routeProps = {location: {search: req.url}, match: {params: {id: req.params.id}}};
    const ctx = {props: {...routeProps, isServer: true}, store};

    Promise.all(preloadAll)
        .then((components) => {
            const promises = components.map((component) => {
                const loadable = (component as any).default || component;

                return loadable.getInitialProps ? loadable.getInitialProps(ctx) : null;
            });

            Promise.all(promises)
                .then((staticProps) => {
                    const context: StaticRouterContext = {};
                    const content = renderer(req, store, context, {...staticProps, isServer: false});

                    if (context.statusCode === 404) {
                        res.status(404);
                    }

                    res.send(content);
                })
                .catch((err) => {
                    next(err);
                });
        })
        .catch((err) => {
            next(err);
        });
}

app.use(
    compression({
        level: 2,
        filter: shouldCompress,
    })
);

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get(paths, handleRequest);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (req.xhr) {
        res.status(500).send({
            errorCode: 500,
            message: 'Internal Server Error',
        });
    } else {
        next(err);
    }
});

app.use(handleRequest);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
