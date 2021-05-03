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
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    hidden: true,
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/table',
    name: 'Admin Manage',
    meta: { title: 'Admin Manage', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Admin',
        component: () => import('@/views/admin/index'),
        meta: { title: 'Admin', icon: 'table' }
      }
    ]
  },
  {
    path: '/editAdmin',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index/:id',
        name: 'editAdmin',
        component: () => import('@/views/editAdmin/index'),
        meta: { title: 'editAdmin', icon: 'form' }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/table',
    name: 'Category',
    meta: { title: 'Category', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'category',
        component: () => import('@/views/category/index'),
        meta: { title: 'Category', icon: 'table' }
      }
    ]
  },

  {
    path: '/editCategory',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index/:id',
        name: 'editCategory',
        component: () => import('@/views/editCategory/index'),
        meta: { title: 'editCategory', icon: 'form' }
      }
    ]
  },

  {
    path: '/addCategory',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'addCategory',
        component: () => import('@/views/addCategory/index'),
        meta: { title: 'addCategory', icon: 'form' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/table',
    name: 'User',
    meta: { title: 'User', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: 'User', icon: 'table' }
      }
    ]
  },

  {
    path: '/editUser',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index/:id',
        name: 'editUser',
        component: () => import('@/views/editUser/index'),
        meta: { title: 'editUser', icon: 'form' }
      }
    ]
  },
  
  {
    path: '/addUser',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'addUser',
        component: () => import('@/views/addUser/index'),
        meta: { title: 'addUser', icon: 'form' }
      }
    ]
  },
  {
    path: '/bookMange',
    component: Layout,
    redirect: '/bookMange/borrow',
    name: 'Book Mange',
    meta: { title: 'Borrow', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'borrow',
        name: 'Borrow',
        component: () => import('@/views/borrow/index'),
        meta: { title: 'Borrow', icon: 'table' }
      },      
      {
        path: 'expired',
        name: 'Expired',
        component: () => import('@/views/expired/index'),
        meta: { title: 'Expired', icon: 'table' }
      }
    ]
  },
  {
    path: '/addBorrow',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'addBorrow',
        component: () => import('@/views/addBorrow/index'),
        meta: { title: 'addBorrow', icon: 'form' }
      }
    ]
  },
  {
    path: '/book',
    component: Layout,
    redirect: '/book/table',
    name: 'Book',
    meta: { title: 'Book', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Book',
        component: () => import('@/views/book/index'),
        meta: { title: 'Book', icon: 'table' }
      }
    ]
  },

  {
    path: '/addBook',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'addBook',
        component: () => import('@/views/addBook/index'),
        meta: { title: 'addBook', icon: 'form' }
      }
    ]
  },

  {
    path: '/editBook',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index/:id',
        name: 'editBook',
        component: () => import('@/views/editBook/index'),
        meta: { title: 'editBook', icon: 'form' }
      }
    ]
  },

  {
    path: '/form',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  

  {
    path: '/nested',
    hidden: true,
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

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
