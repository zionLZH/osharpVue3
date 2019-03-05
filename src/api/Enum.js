import { request } from '@/utils/request'

let path = '/Enum'

export function Read (option) {
  return request({
    url: `${path}/Read`,
    method: 'GET',
    params: option
  })
}
