const routes = [
  {
    path: '/finance',
    redirect: '/finance/chargeApply',
    name: 'Finance',
    alwaysShow: true,
    meta: {
      title: '财务',
      icon: 'finance'
    },
    children: [
      {
        path: 'chargeApply',
        name: 'FinanceChargeApply',
        component: () => import('@/views/finance/chargeApply/index'),
        meta: {
          title: '充值申请',
          icon: 'menuDot'
        },
        children: [
          {
            path: 'create',
            name: 'FinanceChargeApplyCreate',
            component: () => import('@/views/finance/chargeApply/create/index'),
            meta: {
              title: '新增充值申请',
              activeMenu: '/finance/chargeApply'
            },
            hidden: true
          },
          {
            path: 'detail',
            name: 'FinanceChargeApplyDetail',
            component: () => import('@/views/finance/chargeApply/detail/index'),
            meta: {
              title: '充值申请详情',
              activeMenu: '/finance/chargeApply'
            },
            hidden: true
          }
        ]
      },
      {
        path: 'accountCheck',
        name: 'FinanceAccountCheck',
        component: () => import('@/views/finance/accountCheck/index'),
        meta: {
          title: '结算对账',
          icon: 'menuDot'
        }
      }
    ]
  }
]

function getAllPath(routes) {
  let allPath = [];
  let pathMap = new Map();
  function dfs(routes, path) {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      let currentPath = '';
      if (route.path[0] === '/') {
        currentPath = route.path;
      } else {
        currentPath = path ?  path + '/' + route.path : route.path;
      }
      allPath.push(currentPath);
      pathMap.set(currentPath, route)
      route.children && dfs(route.children, currentPath);
    }
  }
  dfs(routes, '');
  return [allPath, pathMap];
}
function findPath(routes, path) {
  return getAllPath(routes)[1].get(path);
}
console.log(getAllPath(routes));
console.log(findPath(routes, '/finance/chargeApply'));