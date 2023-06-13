import { request } from 'api/request'

export const apiFileContentImage = (data) =>
  request({
    url: '/File/ContentImage',
    method: 'post',
    data,
  })
