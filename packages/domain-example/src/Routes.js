// import loadable from '@loadable/component';
import HomePage from './pages/HomePage';
import ArticleListPage from './pages/ArticleListPage';

export default [
  {
    component: HomePage,
    path: '/',
    exact: true
  },
  {
    component: ArticleListPage,
    path: '/articles/:id'
  },
];

// export default [
//   {
//     component: loadable(() => import(/* webpackChunkName: "HomePage" */ './pages/HomePage')),
//     path: '/',
//     exact: true
//   },
//   {
//     component: loadable(() =>
//       import(/* webpackChunkName: "ArticleListPage" */ './pages/ArticleListPage')
//     ),
//     path: '/articles/:id'
//   },
// ];

// export default [
//   {
//     component: loadable(() => import(/* webpackChunkName: "HomePage" */ './pages/HomePage')),
//     path: '/',
//     exact: true
//   },
//   {
//     component: loadable(() =>
//       import(/* webpackChunkName: "ArticleListPage" */ './pages/ArticleListPage')
//     ),
//     path: '/articles/:id'
//   },
// ];
