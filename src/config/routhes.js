import Home from '../components/home';
import Login from '../containers/login';
import Error from '../components/error';
import Category from '../components/Category'

const authRoutes = [
  {
    component: Home,
    path: '/',
    exact: true
  },
  {
    component: Category,
    path: '/category',
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