import axios from 'axios'
import ReactDOM from 'react-dom'
import { Spin, message } from 'antd'
import { createBrowserHistory } from 'history'
import i18n from '../i18n/configs'

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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
    message.error(i18n.t('error.networkError'))
  }
  if (err.code === 'ECONNABORTED') {
    message.error(i18n.t('error.timeOutError'))
  }
  if (err?.response?.status === 401) {
    if (!err.request.responseURL.endsWith('/auth')) {
      createBrowserHistory().replace('/login#sessionTimeout')
      window.location.reload()
    } else {
      message.error(i18n.t('loginPage.loginError'))
    }
  }

  hideLoading()
  return Promise.reject(err)
})

export default Axios
