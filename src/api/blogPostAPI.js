import { request } from 'api/request'

export const apiBlogPostCreate = (data) =>
  request({
    url: '/BlogPost',
    method: 'post',
    data,
  })

export const apiBlogPostPaging = (data) => {
  return request({
    url: '/BlogPost/Paging',
    method: 'post',
    data,
  })
}

export const apiBlogPostGetBySlug = (slug) => {
  return request({
    url: `/BlogPost/${slug}`,
    method: 'get',
  })
}

export const apiBlogPostDelete = (id) => {
  return request({
    url: `/BlogPost/${id}`,
    method: 'delete',
  })
}

export const apiBlogPostPatch = (data) =>
  request({
    url: '/BlogPost',
    method: 'patch',
    data,
  })


