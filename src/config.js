import * as system from '@/utils/system'

export default {
  baseUrl: '/api',
  enableIdSuffix: false,
  whileList: ['login', 'reg'],
  routerHook: (to, from, next) => {
    // next()
     var enableIdSuffix = false
     if (!to.name) {
       next()
       return
     }
     let toRouter = {
       name: to.name,
       query: JSON.parse(JSON.stringify(to.query))
     }
     if (from.query && from.query._suffixId) {
       toRouter.query._suffixId = from.query._suffixId
       window._suffixId = window._suffixId || toRouter.query._suffixId
     }
     if (to.meta.title) {
       document.title = to.meta.title + ' - OSharp'
     }
     if (!system.dataGet('auth', true)) {
       if (to.name === 'login') {
         next()
       } else {
         let loginRouter = {
           replace: true,
           name: 'login',
           query: {}
         }
         if (toRouter.query._suffixId) {
           loginRouter.query._suffixId = toRouter.query._suffixId
         }
         next(loginRouter)
       }
       return false
     } else {
       if (to.query._suffixId) {
         next()
         return false
       }
       if (enableIdSuffix || from.query._suffixId) {
         next(toRouter)
       } else {
         next()
       }
     }
  },
  reqHook: false
}
