import { request } from '@/utils/request'

let path = '/Admin/role'

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

export function Create (option) {
  return request({
    url: `${path}/Create`,
    method: 'POST',
    noSuffix: true,
    data: option
  })
}

export function Delete (option) {
  return request({
    url: `${path}/Delete`,
    method: 'POST',
    noSuffix: true,
    data: option
  })
}

export function ReadUserRoles (option) {
  return request({
    url: `${path}/ReadUserRoles`,
    method: 'GET',
    noSuffix: true,
    params: option
  })
}

export function SetModules (option) {
  return request({
    url: `${path}/SetModules`,
    method: 'POST',
    noSuffix: true,
    data: option
  })
}
