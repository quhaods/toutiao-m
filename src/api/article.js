/*
用户相关请求列表
*/
import request from '../utils/request'

// 请求获取频道新闻推荐(文章列表获取)
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
