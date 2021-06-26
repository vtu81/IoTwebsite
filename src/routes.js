import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
import DeviceList from 'src/pages/DeviceList';
import Messages from 'src/pages/Messages';
import Maps from 'src/pages/Maps';
import Home from './pages/Home';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'devices', element: <DeviceList /> },
      { path: 'messages', element: <Messages /> },
      // { path: 'clientid=:clientid', element: <Messages /> },
      // { path: 'msgid=:msgid', element: <Messages /> },
      { path: 'maps', element: <Maps height='91vh'/> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/home',
    element: <Home />
  }
];

export default routes;
