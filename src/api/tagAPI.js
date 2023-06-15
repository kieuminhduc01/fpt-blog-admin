import { request } from 'api/request'

export const apiTagAll = () =>
  request({
    url: '/Tag/all',
    method: 'get',
  })
