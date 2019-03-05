import { request } from '@/utils/request'

let path = '/ParaEnum'

export function ReadLawCase (option) {
  return request({
    url: `${path}/ReadLawCase`,
    method: 'GET',
    params: option
  })
}

export function ReadEducationBureauNewsType (option) {
  return request({
    url: `${path}/ReadEducationBureauNewsType`,
    method: 'GET',
    params: option
  })
}

export function ReadEducationGroupNewsType (option) {
  return request({
    url: `${path}/ReadEducationGroupNewsType`,
    method: 'GET',
    params: option
  })
}

export function ReadRelationType (option) {
  return request({
    url: `${path}/ReadRelationType`,
    method: 'GET',
    params: option
  })
}

export function ReadBaseStation (option) {
  return request({
    url: `${path}/ReadBaseStation`,
    method: 'GET',
    params: option
  })
}
