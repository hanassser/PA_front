import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 1.Create axios instance
const service = axios.create({
  // public interface, url = base url + request url
//  baseURL: process.env.VUE_APP_SERVER_URL,

  baseURL: 'https://codex-api.herokuapp.com/',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  timeout: 50 * 1000
})

// 2. request interceptor
service.interceptors.request.use(
  config => {
    // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    // 注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
    if (store.getters.token) {
      // config.params = {'token': token}    // 如果要求携带在参数中
      // config.headers.token = token;       // 如果要求携带在请求头中
      // bearer：w3c specification
      // config.headers['Authorization'] = 'Bearer ' + getToken()
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.headers['Access-Control-Allow-Origin'] = '*'

    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 设置cross跨域 并设置访问权限 允许跨域携带cookie信息,使用JWT可关闭
//service.defaults.withCredentials = true


export default service