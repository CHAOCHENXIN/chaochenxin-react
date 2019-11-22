export default [
  {
    icon: 'home',
    value: '首页',
    path: '/'
  },
  {
    icon: 'appstore',
    value: '商品',
    path: '/categorys',
    child: [
      {
        icon: 'unordered-list',
        value: '分类管理',
        path: '/category'
      },
      {
        icon: 'tool',
        value: '商品管理',
        path: '/product'
      }
    ]
  },
  {
    icon: 'user',
    value: '用户管理',
    path: '/user'
  },
  {
    icon: 'security-scan',
    value: '权限管理',
    path: '/role'
  },
  {
    icon: 'area-chart',
    value: '图形图表',
    path: '/charts',
    child: [
      {
        icon: 'bar-chart',
        value: '柱状图',
        path: '/bar'
      },
      {
        icon: 'line-chart',
        value: '折线图',
        path: '/line'
      },
      {
        icon: 'pie-chart',
        value: '饼状图',
        path: '/pie'
      }
    ]
  }
]