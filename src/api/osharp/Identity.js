import { request } from '@/utils/request'

let path = '/Identity'

export function Jwtoken (option) {
  return request({
    url: `${path}/Jwtoken`,
    method: 'POST',
    noSuffix: true,
    data: option
  })
}

export function profile () {
  return request({
    url: `${path}/profile`,
    method: 'GET',
    noSuffix: true
  })
}

export function Logout (option) {
  return request({
    url: `${path}/logout`,
    method: 'POST',
    noSuffix: true,
    data: option
  })
}

export function Register (option) {
  return request({
    url: `${path}/register`,
    method: 'POST',
    noSuffix: true,
    data: option
  })
}
