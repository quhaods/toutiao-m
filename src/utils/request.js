// import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

// Vue.use(axios)

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations'// 接口的基准路径
  // baseURL: 'http://toutiao.itheima.net'
  baseURL: 'http://api-toutiao-web.itheima.net/'
})
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器

export default request
