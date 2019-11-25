export default [
  {
    icon: 'home',
    value: 'home',
    path: '/'
  },
  {
    icon: 'appstore',
    value: 'products',
    path: '/categorys',
    child: [
      {
        icon: 'unordered-list',
        value: 'category',
        path: '/category'
      },
      {
        icon: 'tool',
        value: 'product',
        path: '/product'
      }
    ]
  },
  {
    icon: 'user',
    value: 'user',
    path: '/user'
  },
  {
    icon: 'security-scan',
    value: 'role',
    path: '/role'
  },
  {
    icon: 'area-chart',
    value: 'charts',
    path: '/charts',
    child: [
      {
        icon: 'bar-chart',
        value: 'bar',
        path: '/bar'
      },
      {
        icon: 'line-chart',
        value: 'line',
        path: '/line'
      },
      {
        icon: 'pie-chart',
        value: 'pie',
        path: '/pie'
      }
    ]
  }
]