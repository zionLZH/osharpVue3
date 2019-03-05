import Cookie from 'js-cookie'
import { currentRoutes } from '@/router/index'

const varScope = '_gee_var_'
const dataScope = '_gee_data_'
var globalVar = window[varScope] || {}
// var USER_PERMISSION = 'userPermission'

class Consts {
  // onMobile = innerWidth <= 640
  constructor (arg) {
    this.onMobile = innerWidth <= 640
    let self = this
    window.addEventListener('resize', () => {
      self.onMobile = innerWidth <= 640
    })
  }
}

export { Consts }

export function cookieSet (key, value, opt) {
  Cookie.set(key, value, opt)
}
export function cookieGet (key) {
  return Cookie.get(key)
}
export function setXToken (token) {
  Cookie.set('XToken', token)
}
export function getXToken (token) {
  return Cookie.get('XToken') || false
}
export function removeXToken () {
  Cookie.remove('XToken')
}
export function varSet (key, val) {
  globalVar[key] = val
}
export function varGet (key) {
  return globalVar[key]
}
export function varModel () {
  return globalVar
}
export function dataSet (key, val, disableXToken) {
  var dataKey = dataScope + (disableXToken ? '' : Cookie.get('XToken')) + key
  if (typeof val === 'object') {
    val = encodeURI(JSON.stringify(val))
  }
  localStorage.setItem(dataKey, val)
  if (key === 'auth') {
    localStorage.setItem('auth-time', new Date().getTime()+45*60*1000)
  }
}
export function dataGet (key, disableXToken) {
  var dataKey = dataScope + (disableXToken ? '' : Cookie.get('XToken')) + key
  var dataVal = localStorage.getItem(dataKey)
  try {
    dataVal = JSON.parse(decodeURI(dataVal))
  } catch (e) {
    // nothing
  }
  if (key === 'auth') {
    let dt = parseInt(localStorage.getItem('auth-time'))
    if (new Date().getTime() > dt && localStorage.getItem('auth')) {
      alert('登陆过期，重新登陆')
      localStorage.clear()
      location.reload()
    } else {
      localStorage.setItem('auth-time', new Date().getTime()+45*60*1000)
    }
  }
  return dataVal
}
export function dataRemove (key, disableXToken) {
  localStorage.removeItem(dataScope + (disableXToken ? '' : Cookie.get('XToken')) + key)
}
export function getRoutesTable () {
  var navRoutes = []
  var pageRoutes = []
  for (let i = 0; i < currentRoutes.length; i++) {
    if (currentRoutes[i].name && currentRoutes[i].meta && currentRoutes[i].meta.title) {
      navRoutes.push({
        name: currentRoutes[i].name,
        title: currentRoutes[i].meta.title,
        hidden: currentRoutes[i].meta.hidden,
        path: currentRoutes[i].path
      })
      if (!currentRoutes[i].children) {
        pageRoutes.push({
          name: currentRoutes[i].name,
          title: currentRoutes[i].meta.title,
          path: currentRoutes[i].path
        })
      } else {
        let routesItem = currentRoutes[i]
        for (let j = 0; j < routesItem.children.length; j++) {
          if (routesItem.children[j].name && routesItem.children[j].meta && routesItem.children[j].meta.title) {
            pageRoutes.push({
              name: routesItem.children[j].name,
              title: routesItem.children[j].meta.title,
              hidden: routesItem.children[j].meta.hidden,
              supName: routesItem.name,
              path: routesItem.path + '/' + routesItem.children[j].path
            })
          }
        }
      }
    } else if (currentRoutes[i].children.length === 1) {
      navRoutes.push({
        name: currentRoutes[i].children[0].name,
        title: currentRoutes[i].children[0].meta.title,
        hidden: currentRoutes[i].children[0].meta.hidden,
        path: currentRoutes[i].children[0].path
      })
      pageRoutes.push({
        name: currentRoutes[i].children[0].name,
        title: currentRoutes[i].children[0].meta.title,
        hidden: currentRoutes[i].children[0].meta.hidden,
        path: currentRoutes[i].children[0].path
      })
    }
  }
  return {
    nav: navRoutes,
    page: pageRoutes
  }
}
