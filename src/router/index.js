/* eslint-disable*/
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/core/Layout'
import Blank from '@/core/blank'
import { coreRoutes } from '@/router/core'

Vue.use(Router)
/**
 * Full Page Routes
 * Login/404/401..
 * example:
 * {
 *   path: '/login',
 *   name: 'login'
 *   component: () => import('Vue File Path')
 * }
 */
const fullPageRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: { title: '登陆', pass: true },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/reg',
    name: 'reg',
    meta: { title: '注册', pass: true },
    component: () => import('@/view/login/reg.vue')
  }
]
/**
 * 1
 */
const currentRoutes = [
  {
    path: '/',
    component: Layout,
    meta: {title: '首页'},
    children: [
      { path: 'default', name: 'default', component: () => import('@/view/default/index'), meta: {title: '首页', hidden: false} },
    ]
  },
  // {
  //   path: '/test',
  //   name: 'test',
  //   meta: { title: 'Test' },
  //   component: Layout,
  //   children: [
  //     { path: 'upload', name: 'testUpload', component: () => import('@/view/test/page/upload'), meta: {title: '演示上传'} },
  //     { path: 'list', name: 'testList', component: () => import('@/view/test/page/list'), meta: {title: '演示列表 - 页面', hidden: false} },
  //     { path: 'poplist', name: 'testpopList', component: () => import('@/view/test/pop/list'), meta: {title: '演示列表 - 弹窗', hidden: false} },
  //     { path: 'detail', name: 'testDetail', component: () => import('@/view/test/page/detail'), meta: {title: '演示详情', hidden: true} }
  //   ]
  // },
  {
    path: '/identity',
    name: 'identity',
    meta: { title: '身份认证' },
    component: Layout,
    children: [
      { path: 'user', name: 'identityUser', component: () => import('@/view/Osharp/identity/user'), meta: {title: '用户信息管理', hidden: false} },
      { path: 'role', name: 'identityRole', component: () => import('@/view/Osharp/identity/role'), meta: {title: '角色信息管理', hidden: false} },
      { path: 'user-role', name: 'identityUserRole', component: () => import('@/view/Osharp/identity/user-role'), meta: {title: '用户角色管理', hidden: false} },
      ]
    },
    {
      path: '/security',
      name: 'security',
      meta: { title: '权限安全' },
      component: Layout,
      children: [
      { path: 'module', name: 'securityModule', component: () => import('@/view/Osharp/security/module'), meta: {title: '模块信息管理', hidden: false} },
      { path: 'function', name: 'securityFunction', component: () => import('@/view/Osharp/security/function'), meta: {title: '功能信息管理', hidden: false} },
      { path: 'role-function', name: 'securityRoleFunction', component: () => import('@/view/Osharp/security/role-function'), meta: {title: '角色功能管理', hidden: false} },
      { path: 'user-function', name: 'securityUserFunction', component: () => import('@/view/Osharp/security/user-function'), meta: {title: '用户功能管理', hidden: false} },
      { path: 'entityinfo', name: 'securityentityinfo', component: () => import('@/view/Osharp/security/entityinfo'), meta: {title: '实体信息管理', hidden: false} },
      { path: 'pack', name: 'systemPack', component: () => import('@/view/Osharp/system/pack'), meta: {title: '模块包', hidden: false} },
      { path: 'audtEntity', name: 'systemAuditEntity', component: () => import('@/view/Osharp/system/auditEntity'), meta: {title: '数据审计', hidden: false} }
    ]
  }
]

export default new Router({
  routes: fullPageRoutes.concat(coreRoutes).concat(currentRoutes)
})
export { currentRoutes }
