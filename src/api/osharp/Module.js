import { request } from '@/utils/request'

let path = '/Admin/module'

export function Read (option) {
  return request({
    url: `${path}/Read`,
    method: 'POST',
    noSuffix: true,
    data: option
  })
}

export function Readfunctions (option) {
  return request({
    url: `${path}/readfunctions`,
    method: 'POST',
    noSuffix: true,
    data: option
  })
}

export function ReadUserModules (option) {
  return request({
    url: `${path}/ReadUserModules`,
    method: 'GET',
    noSuffix: true,
    params: option
  })
}

export function ReadRoleModules (option) {
  return request({
    url: `${path}/ReadRoleModules`,
    method: 'GET',
    noSuffix: true,
    params: option
  })
}
