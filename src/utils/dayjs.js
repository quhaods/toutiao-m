import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

// dayjs()获取当前的最新时间
// console.log(dayjs().format('YYYY-MM-DD'))

// 导入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

// dayjs 默认语言是英文，在这里配置为英文
// 全局使用
dayjs.locale('zh-cn')

// 加载相对时间插件
dayjs.extend(relativeTime)

console.log(dayjs().to(dayjs('1990-01-01')))

// 定义一个全局过滤器，就可以在任何组件的模板中使用了
// 器士过滤器就相当于一个全局可用的方法（仅供模板使用）
// 参数1：过滤器名称
// 参数2：过滤器函数
// 使用方式：{{表达式 | 过滤器名称}}
// 管道符前面的表达式结果会作为参数传递到过滤器函数中
// 过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})
