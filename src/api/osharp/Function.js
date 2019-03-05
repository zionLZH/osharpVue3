import { request } from '@/utils/request'

let path = '/Admin/function'

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
    url: `${path}/Update`,
    method: 'POST',
    noSuffix: true,
    data: option
  })
}
