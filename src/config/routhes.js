import Home from '../components/home';
import Login from '../containers/login';
import Error from '../components/error';

const authRoutes = [
  {
    component: Home,
    path: '/',
    exact: true
  },
  {
    component: Error
  }
]

const noAuthRoutes = [
  {
    component: Login,
    path: '/login',
    exact: true
  }
]

export {
  authRoutes,
  noAuthRoutes
}