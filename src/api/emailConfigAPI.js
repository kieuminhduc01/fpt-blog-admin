import { request } from 'api/request'

export const apiEmailConfigGet = () => {
  return request({
    url: '/EmailConfig',
    method: 'get',
  })
}

export const apiEmailConfigPatch = (data) => {
  return request({
    url: '/EmailConfig',
    method: 'patch',
    data,
  })
}
