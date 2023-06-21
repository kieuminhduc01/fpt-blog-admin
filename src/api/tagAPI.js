import { request } from 'api/request'

export const apiTagAll = () =>
  request({
    url: '/Tag/all',
    method: 'get',
  })

export const apiTagDelete = (data) => {
  return request({
    url: `/Tag`,
    method: 'delete',
    data,
  })
}

export const apiTagPut = (data) => {
  return request({
    url: `/Tag`,
    method: 'put',
    data,
  })
}

export const apiTagCreate = (data) => {
  return request({
    url: `/Tag`,
    method: 'post',
    data,
  })
}
