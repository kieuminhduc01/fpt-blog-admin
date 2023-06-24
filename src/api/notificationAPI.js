import { request } from 'api/request'

export const GetPagingNotification = (data) =>
  request({
    url: '/Notify/Paging',
    method: 'post',
    data
  })
  export const ReadAllNotification = () =>
  request({
    url: '/Notify/Read-All',
    method: 'patch'
  })
