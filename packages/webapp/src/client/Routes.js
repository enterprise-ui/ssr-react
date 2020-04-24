import loadable from '@loadable/component';
import App from './App';

export default [
  {
    component: App,
    routes: [
      {
        component: loadable(() =>
          import(/* webpackChunkName: "home" */ '@poc/articles/public/home')
        ),
        path: '/',
        exact: true
      },
      {
        component: loadable(() =>
          import(/* webpackChunkName: "articles" */ '@poc/articles/public/articles')
        ),
        path: '/articles/:id'
      }
    ]
  }
];
