import loadable from '@loadable/component';
import {App} from './App';
import {IRoute} from './Models';

const routes: IRoute[] = [
    {
        component: App,
        routes: [
            {
                component: loadable(() =>
                    import(/* webpackChunkName: "HomePage" */ '@ssr-react/domain-example/public/cjs/home.development')
                ),
                path: '/',
                exact: true,
            },
            {
                component: loadable(() =>
                    import(/* webpackChunkName: "ArticlesPage" */ '@ssr-react/domain-example/public/cjs/articles.development')
                ),
                path: '/articles/:id',
            },
        ],
    },
];

const paths = ['/', '/articles/:id'];

export {paths, routes};
