import { request } from '@/utils/request'

let path = '/security'

export function getauthinfo () {
  return request({
    url: `${path}/getauthinfo`,
    method: 'GET',
    noSuffix: true
  })
}
