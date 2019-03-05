import Axios from 'axios'
import Config from '@/config'
import * as system from './system'
const qs = require('qs')

export function request (opt) {
  if (system.dataGet('auth', true)) {
    opt.headers = opt.headers || {}
    opt.headers.Authorization = 'Bearer ' + system.dataGet('auth', true)
  }
  // BaseUrl拼接
  opt.url = (Config.baseUrl || '') + opt.url
  if (opt.form) {
    opt.headers = opt.headers || {}
    opt['Content-Type'] = 'application/x-www-form-urlencoded'
    opt.data = qs.stringify(opt.form)
  }
  // 查询Id后缀
  try {
    let pArr = location.href.split('_suffixId=')
    pArr = pArr[1].split('&')
    window._suffixId = parseInt(pArr[0])
  } catch (e) {

  }
  if (window._suffixId && !opt.hb && !opt.noSuffix) {
    opt.url = opt.url + '/' + window._suffixId
  }
  return new Promise((resolve, reject) => {
    Axios(opt).then(res => {
      Config.reqHook && Config.reqHook(true, res)
      resolve(res)
    }).catch(e => {
      Config.reqHook && Config.reqHook(false, e)
      reject(e)
    })
  })
}
export default request
export function requestAll (arr) {
  if (!arr || arr.length === 0) {
    console.error(new Error('requestAll: arr must be a Array'))
    return null
  }
  return new Promise((resolve, reject) => {
    Axios.all(arr).then(resArr => {
      Config.reqHook && Config.reqHook(true, resArr)
      resolve(resArr)
    }).catch(e => {
      Config.reqHook && Config.reqHook(false, e)
      reject(e)
    })
  })
}
