import axios from 'axios';
import codeMessage from '../config/code-message';
import store from '../redux/store.js'
import { message } from 'antd';
import { removeItem } from '../utils/storage';
import { removeUserSuccess } from '../redux/action-creators/user'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    
  }
})

axiosInstance.interceptors.request.use( (config) => {
  if (config.method === 'post') {
    config.headers['content-type'] = 'application/x-www-form-urlencoded'
    config.data = Object.keys(config.data).reduce((p,k) => {
      const value = config.data[k]
      return p + `&${k}=${value}`
    },'').substring(1)
  }

  const {user: {token}} = store.getState()

  if (token) {
    config.headers.authorization = 'Bearer ' + token
  }
  return config
})

axiosInstance.interceptors.response.use( (response) => {
  console.log(response.data.msg)
  if (response.data.status === 0) {
      return response.data.data
    }else {
      message.error(response.data.msg)
      return Promise.reject(response.data.status)
    }
  },
  (error) => {
    let errorMessage = ''

    if (error.response) {
      errorMessage = codeMessage[error.response.status] || '未知错误'

      if (error.response.status === 401) {
        //说明token有问题 
        //清空本地token（localStorage、redux） 重定向到 /login
        removeItem()
        //调用命令就会生成action
        store.dispatch(removeUserSuccess())
        window.history.push('./login')
      }

    } else {
      if (error.message.indexOf('Network Error') !== 1) {
        errorMessage = '请检查网络连接'
      } else if (error.message.indexOf('timeout') !== 1) {
        errorMessage = '网络太卡了，请连上wife重试'
      } else {
        errorMessage = '为知错误'
      }
    }

    message.error(errorMessage)
    return Promise.reject()
  }
)

export default axiosInstance