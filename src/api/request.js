import axios from 'axios'
import Cookies from 'js-cookie'

// export const BASE_URL = 'http://103.229.41.235:99/'
export const BASE_URL = 'https://localhost:44302/'
export const request = axios.create({
  baseURL: `${BASE_URL}api`,
  timeout: 20_000,
  headers: { Authorization: `Bearer ${Cookies.get('jwt_token')}` },
})
