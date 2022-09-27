import axios from 'axios'
import ReactDOM from 'react-dom'
import { Spin, message } from 'antd'
// import { createBrowserHistory } from 'history'

const Axios = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 20000,
  withCredentials: true
})

let requestCount = 0

function showLoading() {
  if (requestCount === 0) {
    const dom = document.createElement('div')
    dom.setAttribute('id', 'loading')
    document.body.appendChild(dom)
    ReactDOM.render(<Spin size="large" />, dom)
  }
  requestCount++
}

function hideLoading() {
  requestCount--
  if (requestCount === 0) {
    document.body.removeChild(document.getElementById('loading'))
  }
}

Axios.interceptors.request.use((config) => {
  showLoading()
  return config
}, (err) => {
  hideLoading()
  return Promise.reject(err)
})

Axios.interceptors.response.use((res) => {
  hideLoading()
  return res
}, (err) => {
  if (err.message === 'Network Error') {
    message.error('Network error.')
    err.showed = true
  }
  if (err.code === 'ECONNABORTED') {
    message.error('Timeout error.')
    err.showed = true
  }
  // if (err?.response?.status === 401) {
  //   createBrowserHistory().replace('/signIn')
  //   window.location.reload()
  //   message.error(i18n.t('msg.authFailedError'))
  //   err.showed = true
  // }

  hideLoading()
  return Promise.reject(err)
})

export default Axios
