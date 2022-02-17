/*
* 频道请求模块
*/
import request from '../utils/request'

// 请求获取全部频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
