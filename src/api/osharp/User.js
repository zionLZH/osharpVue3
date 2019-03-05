import { request } from '@/utils/request'

let path = '/Admin/User'

export function Read (option) {
  return request({
    url: `${path}/Read`,
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

export function setroles (option) {
  return request({
    url: `${path}/setroles`,
    method: 'POST',
    noSuffix: true,
    data: option
  })
}

export function setmodules (option) {
  return request({
    url: `${path}/setmodules`,
    method: 'POST',
    noSuffix: true,
    data: option
  })
}
