import { request } from '@/utils/request'

let path = '/admin/userfunction'

export function Read (option) {
  return request({
    url: `${path}/read`,
    method: 'POST',
    noSuffix: true,
    data: option
  })
}

export function Readfunctions (param, option) {
  return request({
    url: `${path}/readfunctions`,
    method: 'POST',
    noSuffix: true,
    params: param,
    data: option
  })
}
