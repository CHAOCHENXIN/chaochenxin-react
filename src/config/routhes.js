import Home from '../components/home';
import Login from '../components/login';
import Error from '../components/error';

export default [
  {
    component: Home,
    path: '/',
    exact: true
  },
  {
    component: Login,
    path: '/login',
    exact: true
  },
  {
    component: Error
  }
]