/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
import router from '@/router'
import { SERVER_BASEAPI } from '@/utils/constants'

const request = axios.create({
  baseURL: SERVER_BASEAPI, // 接口的基准路径
  // 自定义后端返回的原始数据
  // data: 后端返回的原始数据，说白了就是 JSON 格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
    // axios 默认会在内部这样来处理后端返回的数据
    // return JSON.parse(data)
  }]
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 查看是否有用户token，如果有把用户token加上请求头
    const user = store.state.user
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。成功状态码下的响应拦截
    // 对响应数据做点什么
    return response
  },
  async function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。失败状态下的响应拦截
    // 对响应错误做点什么
    // 检验响应状态出错原因
    if (error.response && error.response.status === 401) {
      const user = store.state.user
      if (!user || !user.refresh_token) {
        // 如果没有用户刷新token需要重新登入
        router.push('/login')
        return Promise.reject(error)
      }
      try {
        // 发送请求,刷新token
        const res = await axios({
          method: 'PUT',
          path: SERVER_BASEAPI + '/v1_0/authorizations',
          Headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        store.commit('setUser', {
          token: res.data.data.token,
          refresh_token: res.data.data.refresh_token
        })
      } catch (err) {
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)
export default request
