import config from '@/config'
import * as system from '@/utils/system'

export function routerHook (to, from, next) {
  if (to.query._suffixId || from.query._suffixId) {
    window._suffixId = to.query._suffixId || from.query._suffixId || false
  }
  if (typeof to === 'string') {
    return
  }
  if (to.matched.length === 0) {
    if (from.matched.length !== 0 && to.name.indexOf('/') !== -1) {
      next(from)
      return
    }
    next({
      name: '404',
      query: {
        _suffixId: window._suffixId
      },
      replace: false
    })
    return
  }
  if (!to.name || config.whileList.indexOf(to.name) !== -1 || config.whileList.indexOf(to.path) !== -1) {
    next()
    return
  }
  // console.log(to)
  if (config.routerHook) {
    config.routerHook(to, from, next)
  }
  if (to.path === '/') {
    next({ path: '/default', replace: true })
  } else {
    next()
  }
  return false
  // const XToken = system.getXToken()
  // if (XToken) {
  //   // 已经登陆，权限判断
  //   const userPermission = system.varGet('userPermission')
  //   if (userPermission && userPermission.indexOf(to.name) !== -1) {
  //     next()
  //   } else {
  //     next({ path: '/401', replace: true })
  //   }
  // } else {
  //   if (to.meta && to.meta.pass) {
  //     next()
  //     return
  //   }
  // }
}
