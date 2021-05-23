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
      meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    }]
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
        meta: { title: 'Admin', icon: 'user' }
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
        meta: { title: 'Category', icon: 'clipboard' }
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
        meta: { title: 'User', icon: 'user' }
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
    meta: { title: 'Borrow', icon: 'form' },
    children: [
      {
        path: 'borrow',
        name: 'Borrow',
        component: () => import('@/views/borrow/index'),
        meta: { title: 'Borrow', icon: 'edit' }
      },      
      {
        path: 'expired',
        name: 'Expired',
        component: () => import('@/views/expired/index'),
        meta: { title: 'Expired', icon: 'eye-open' }
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
    meta: { title: 'Book', icon: 'book' },
    children: [
      {
        path: 'table',
        name: 'Book',
        component: () => import('@/views/book/index'),
        meta: { title: 'Book', icon: 'book' }
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
