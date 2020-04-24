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
