import axios from 'axios'
import Cookies from 'js-cookie'

export const BASE_URL = 'http://103.101.160.70:99/'
export const request = axios.create({
  baseURL: `${BASE_URL}api`,
  timeout: 20_000,
  headers: { Authorization: `Bearer ${Cookies.get('jwt_token')}` },
})
