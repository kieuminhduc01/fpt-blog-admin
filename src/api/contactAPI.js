import { request } from 'api/request'

export const apiContactGet = () => {
  return request({
    url: '/Contact',
    method: 'get',
  })
}

export const apiContactPatch = (data) => {
  return request({
    url: '/Contact',
    method: 'patch',
    data,
  })
}
