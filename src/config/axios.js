import axios from 'axios'

// 请求拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        console.log('错误请求')
        break;
      case 404:
        console.log('请求错误，未找到该资源')
        break;
      case 500:
        console.log('服务端出错')
        break;
      default:
        console.log(`连接出错${error.response.status}`)
    }
  }
  return Promise.resolve(error.response)
})

function checkStatus(response) {
  if ((response && response.data.code === '5') || response.data.code === '9') {
    console.log(response.data.message)
  } else {
    return response.data
  }
}

/* 封装 Get请求 */
export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(`${url}`, {
        params: params
      })
      .then(response => {
        resolve(checkStatus(response))
      })
      .catch(err => {
        reject(err)
      })
  })
}
/* 封装 Post请求 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(`${url}`, data)
      .then(response => {
        resolve(checkStatus(response))
      })
      .catch(err => {
        reject(err)
      })
  })
}
