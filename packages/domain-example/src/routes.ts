import ArticleListPage from './pages/ArticleListPage';
import HomePage from './pages/HomePage';

export const routes = [
    {
        component: HomePage,
        path: '/',
        exact: true,
    },
    {
        component: ArticleListPage,
        path: '/articles/:id',
    },
];
