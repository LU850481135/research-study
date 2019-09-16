import axios from 'axios'
import Storage from '@/utils/storage'

//创建axios实例
const instance = axios.create({
  timeout: 2000, // 请求超时时间
  withCredentials: true, // 选项表明了是否是跨域请求
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
})

const processToken = (conf) => {
  const token = Storage.getItem('token')
  if (token) {
    conf.headers.common['Authorization'] = `Bearer ${token}`
  }
  return conf
}

instance.interceptors.request.use(config => {
  return processToken(config)
}, err => {
  return Promise.reject(err)
})

export default instance
