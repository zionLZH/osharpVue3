import { request } from '@/utils/request'

let path = '/Common'

export function VerifyCode (option) {
  return new Promise((resolve, reject) => {
    request({
      url: `${path}/VerifyCode`,
      method: 'GET'
    }).then(res => {
      var arr = [ false, false ]
      try {
        let base64 = atob(res.data)
        arr = base64.split('#$#')
      } catch (e) {
        // nothing
      }
      resolve({res: res, vcode: arr[0], vcodeId: arr[1]})
    }).catch(e => {
      console.log(e)
      reject(e)
    })
  })
}
