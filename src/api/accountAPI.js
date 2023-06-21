import { request } from 'api/request'

export const apiAccountChangePass = (data) => {
  return request({
    url: '/Account/ChangePass',
    method: 'patch',
    data,
  })
}

export const apiAccountResetPass = (data) => {
  return request({
    url: '/Account/ResetPassword',
    method: 'patch',
    data,
  })
}

export const apiAccountAuthPost = (data) => {
  return request({
    url: '/Account/Auth',
    method: 'post',
    data,
  })
}

export const apiAccountAuthValidatePost = (token) => {
  return request({
    url: '/Account/Auth/Validate',
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
