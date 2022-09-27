import axios from 'axios'
// import ReactDOM from 'react-dom'
// import { Spin } from 'antd'
// import { createBrowserHistory } from 'history'

const Axios = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 20000,
  withCredentials: true
})

// let requestCount = 0

// function showLoading() {
//   if (requestCount === 0) {
//     const dom = document.createElement('div')
//     dom.setAttribute('id', 'loading')
//     document.body.appendChild(dom)
//     ReactDOM.render(<Spin size="large" />, dom)
//   }
//   requestCount++
// }

// function hideLoading() {
//   requestCount--
//   if (requestCount === 0) {
//     document.body.removeChild(document.getElementById('loading'))
//   }
// }

// Axios.interceptors.request.use((config) => {
//   if (!config.hideLoading) {
//     showLoading()
//   }
//   return config
// }, (err) => {
//   if (!err.config.hideLoading) {
//     hideLoading()
//   }
//   return Promise.reject(err)
// })

// Axios.interceptors.response.use((res) => {
//   if (!res.config.hideLoading) {
//     hideLoading()
//   }
//   return res
// }, (err) => {
//   if (err.message === 'Network Error') {
//     message.error(i18n.t('msg.networkError'))
//     err.showed = true
//   }
//   if (err.code === 'ECONNABORTED') {
//     message.error(i18n.t('msg.timeoutError'))
//     err.showed = true
//   }
//   if (err?.response?.status === 401) {
//     createBrowserHistory().replace('/signIn')
//     window.location.reload()
//     message.error(i18n.t('msg.authFailedError'))
//     err.showed = true
//   }

//   if (!err.config.hideLoading) {
//     hideLoading()
//   }
//   return Promise.reject(err)
// })

export default Axios
