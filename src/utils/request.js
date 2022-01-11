import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/' // 接口的基准路径
})
// 请求拦截器

// 响应拦截器

export default request
