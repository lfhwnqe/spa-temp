import PageNotFoundView from '@/components/common/PageNotFoundView';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/home';
import Todo from '@/pages/todo/todo';
import { RouteObject } from 'react-router-dom';

const Routes: RouteObject[] = [];

const mainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '*', element: <PageNotFoundView /> },
    { path: '/', element: <Home /> },
    { path: '404', element: <PageNotFoundView /> },
    { path: 'todo', element: <Todo /> },
  ],
};
Routes.push(mainRoutes);

export default Routes;
