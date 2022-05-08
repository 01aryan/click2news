import DashboardLayout from 'components/Layouts/DashboardLayout';
import LoadingScreen from 'components/LoadingScreen';
import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

const Loadable = Component => props => <Suspense fallback={<LoadingScreen />}>
  <Component {...props} />
</Suspense>; // Landing page


const ComponentsPage = Loadable(lazy(() => import('./pages/ComponentsPage')));

const DashboardSaaS = Loadable(lazy(() => import('./pages/dashboards/SaaS')));
const DashboardSales = Loadable(lazy(() => import('./pages/dashboards/Sales')));
const DashboardProjectManagement = Loadable(lazy(() => import('./pages/dashboards/ProjectManagement')));
const DashboardProjectManagementV2 = Loadable(lazy(() => import('./pages/dashboards/ProjectManagementV2'))); // data tables

const TodoList = Loadable(lazy(() => import('./pages/TodoList')));
const UkoProjectV1 = Loadable(lazy(() => import('./pages/ukoProjects/UkoProjectV1')));
const UkoProjectV2 = Loadable(lazy(() => import('./pages/ukoProjects/UkoProjectV2')));
const UkoProjectV3 = Loadable(lazy(() => import('./pages/ukoProjects/UkoProjectV3')));
const ProjectDetails = Loadable(lazy(() => import('./pages/ukoProjects/ProjectDetails'))); // user profile
const News = Loadable(lazy(() => import('./pages/news')));

const Error = Loadable(lazy(() => import('./pages/404'))); // routes

const routes = [
  {
    path: '/',
    element: <Navigate to="dashboard" />
  },
  {
    path: 'components',
    element: <ComponentsPage />
  },
  {
    path: 'news', // CHANGE 2: created a route for news page
    element: <DashboardLayout><News></News></DashboardLayout>
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <DashboardSaaS />
      }, {
        path: 'sales',
        element: <DashboardSales />
      }, {
        path: 'project-management',
        element: <DashboardProjectManagement />
      }, {
        path: 'project-management-v2',
        element: <DashboardProjectManagementV2 />
      }, {
        path: 'todo-list',
        element: <TodoList />
      }, {
        path: 'uko-project-v1',
        element: <UkoProjectV1 />
      }, {
        path: 'uko-project-v2',
        element: <UkoProjectV2 />
      }, {
        path: 'uko-project-v3',
        element: <UkoProjectV3 />
      }, {
        path: 'project-details',
        element: <ProjectDetails />
      }
    ]
  },
  {
    path: '*',
    element: <Error />
  }
];
export default routes;