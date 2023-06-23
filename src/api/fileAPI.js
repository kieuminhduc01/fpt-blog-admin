import { request } from 'api/request'

export const apiFileContentImage = (data) =>
  request({
    url: '/File/ContentImage',
    method: 'post',
    data,
  })

export const apiFileCoverImage = (data) =>
  request({
    url: '/File/CoverImage',
    method: 'post',
    data,
  })
