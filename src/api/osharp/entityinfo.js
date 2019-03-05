import { request } from '@/utils/request'

let path = '/admin/entityinfo'

export function Read (option) {
  return request({
    url: `${path}/read`,
    method: 'POST',
    noSuffix: true,
    data: option
  })
}

export function Update (option) {
  return request({
    url: `${path}/update`,
    method: 'POST',
    noSuffix: true,
    data: option
  })
}
