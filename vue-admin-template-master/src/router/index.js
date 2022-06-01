import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 采购合同
  {
    path: '/',
    component: Layout,
    redirect: '/contract',
    children: [{
      path: 'contract',
      name: '采购合同',
      component: () => import('@/views/contract/index'),
      meta: { title: '采购合同', icon: 'dashboard' }
    }]
  },

  //销售管理
  {
    path: '/sale',
    component: Layout,
    redirect: '/sale/table',
    name: 'sale',
    meta: { title: '销售管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'salecontract',
        name: 'Contract',
        component: () => import('@/views/sale/contract/index'),
        meta: { title: '销售合同', icon: 'table' }
      },
      {
        path: 'cost',
        name: 'Cost',
        component: () => import('@/views/sale/cost/index'),
        meta: { title: '成本占用管理', icon: 'tree' }
      },
      {
        path: 'ticket',
        name: 'Ticket',
        component: () => import('@/views/sale/ticket/index'),
        meta: { title: '补票占用管理', icon: 'tree' }
      }
    ]
  },


  //业务管理
  {
    path: '/business',
    component: Layout,
    redirect: '/business/table',
    name: 'business',
    meta: { title: '业务查询', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'stock',
        name: '库存查询',
        component: () => import('@/views/business/stock/index'),
        meta: { title: '库存查询', icon: 'table' }
      },
      {
        path: 'writeoff',
        name: '核销查询',
        component: () => import('@/views/business/writeoff/index'),
        meta: { title: '核销查询', icon: 'tree' }
      },
      {
        path: 'receipts',
        name: '销售发票查询',
        component: () => import('@/views/business/receipts/index'),
        meta: { title: '销售发票查询', icon: 'tree' }
      }
    ]
  },
  {
    path: '/management',
    component: Layout,
    redirect: '/management/table',
    name: 'management',
    meta: { title: '设置管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'parameter',
        name: '参数设置',
        component: () => import('@/views/management/parameter/index'),
        meta: { title: '参数设置', icon: 'table' }
      },
      {
        path: 'contractBelong',
        name: '合同所属管理',
        component: () => import('@/views/management/contractBelong/index'),
        meta: { title: '合同所属管理', icon: 'tree' }
      }
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/nested',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/nested/menu1/index'),
        name: 'nested',
        meta: {role:['admin'], title: '超级权限控制测试', icon: 'nested'}
      }
    ]
  },
  {
    path: '/super',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/nested/menu1/index'),
        name: 'nested',
        meta: { title: '普通权限', icon: 'nested'}
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
  // 404 page must be placed at the end !!!
];


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
