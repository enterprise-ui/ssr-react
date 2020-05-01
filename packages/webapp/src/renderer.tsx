import {ChunkExtractor} from '@loadable/server';
import {Request} from 'express';
import path from 'path';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {Helmet} from 'react-helmet';
import {Provider} from 'react-redux';
import {StaticRouterContext} from 'react-router';
import {renderRoutes} from 'react-router-config';
import {StaticRouter} from 'react-router-dom';
import {Store} from 'redux';
import serialize from 'serialize-javascript';
import {routes} from './client/Routes';

export default (req: Request, store: Store, context: StaticRouterContext) => {
    const statsFile = path.resolve('./public/loadable-stats.json');
    const extractor = new ChunkExtractor({statsFile});
    const jsx = extractor.collectChunks(
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                <div>{renderRoutes(routes)}</div>
            </StaticRouter>
        </Provider>
    );

    const content = renderToString(jsx);

    const helmet = Helmet.renderStatic();

    const scriptTags = extractor.getScriptTags();

    return `<!DOCTYPE html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(/</g, '\\u003c')}
                </script>
                ${scriptTags}
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            </body>
    </html>`;
};
