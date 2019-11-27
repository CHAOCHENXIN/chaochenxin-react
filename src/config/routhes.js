import Home from '../components/home';
import Login from '../containers/login';
import Error from '../components/error';
import Category from '../components/Category';
import Product from '../components/product';
import showAddCategory from '../components/product/showAddCategory';
import Modify from '../components/product/modify';
import GoodsDetails from '../components/product/GoodsDetails'

const authRoutes = [
  {
    component: Home,
    path: '/',
    exact: true
  },
  {
    component: Product,
    path: '/product',
    exact: true
  },
  {
    component: Modify,
    path: '/product/saveupdate',
    exact: true
  },
  {
    component: GoodsDetails,
    path: '/product/detail',
    exact: true
  },
  {
    component: showAddCategory,
    path: '/product/add',
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