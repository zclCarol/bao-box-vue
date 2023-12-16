import axios from 'axios'
import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//import {routers} from '../routers/routerConfig'
// import storage from './storage'
// import querystring from 'querystring'

// axios 配置
axios.defaults.timeout = 1000 * 30
axios.defaults.baseURL = '/api'

/**
 * 请求拦截
 */
axios.interceptors.request.use(
  config => {
    config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
    return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
axios.interceptors.response.use(
  response => {
    if (response.data && response.data.status === 401) { // 401, token失效
      // clearLoginInfo()
      // router.push({ name: 'login' })
      this.$router.replace('login')
    } 
    return response
}, error => {
  return Promise.reject(error)
})


/**
 * 封装axios的通用请求
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数，没有则传空对象
 * @param  {Function} fn        回调函数 fn(返回的数据,错误信息)
 * @param  {Function} progress  上传进度函数 fn(返回的数据)
 * @return
 */
function ajax(url, data, fn, progress = function () {}) {
  axios.defaults.baseURL = '/api'
  NProgress.start()
  //let head = 'application/x-www-form-urlencoded; charset=UTF-8'
  let head = 'application/json;charset=utf-8'
  if (Object.prototype.toString.call(data) === '[object FormData]') {
    head = 'multiple/form-data'// 上传文件
  } else if (data.contentType === 'json') {
    head = 'application/json;charset=utf-8'
    data = data.data
  } else {
    // data = querystring.stringify(data)
    // console.log(data)
  }
  axios({
    method: 'post',
    url,
    data: data,
    onUploadProgress: event => {
      progress.call(this, Math.round((event.loaded * 100) / event.total))
    },
    headers: { 'Content-Type': head }
  }).then(
    (res) => {
      if (res.status === 200 && res.data.code === 0) {
        // console.log(res.data)
        fn.call(this,res.data)
        NProgress.done()
      } else {
        // console.log(res.data)
        //这里的回调为了处理请求成功，但系统异常后需要再页面做一些处理的情况
        fn.call(this,res.data)
        //this.notifyError(res.data.msg);
        this.$alert(
          '系统错误',
            {
              title: '错误',
              message: res.data.code +'--'+ res.data.msg,
              confirmButtonText: '确定',
              type: 'error'
            }
        ).then(() => {
          NProgress.done()
        }).catch(err => {
          return Promise.reject(err);
        })
      }
    }
  ).catch(err => {
    console.log('代码有问题：', err)
    // if(!err.status == '404'){
    //   this.$router.replace('/404')
    // }
    if(!err.code == '"ERR_BAD_RESPONSE"'){
      fn.call(this,err)
    }
    if(err.response.status == 404){
      this.$router.push('/404')
      return
    }
    this.$alert(
      '前端代码错误',
        {
          title: '错误',
          message: err.code +'--'+ err.message + '--' + '此为系统错误，将终止操作',
          confirmButtonText: '确定',
          type: 'error'
        }
    ).then(() => {
      NProgress.done()
      return Promise.reject(err);
    })
  })
}

/**
 * 封装原项目后端axios的通用请求
 * 随时弃用
 */
function ajaxShopping(url, data, fn) {
  
  Vue.prototype.$axios = axios
  axios.defaults.baseURL = '/shopping'
  NProgress.start()
  // console.log(url)

  this.$axios
  .post(url, data)
  .then(res => {
    NProgress.done()
    fn.call(this,res.data)
  })
  .catch(err => {
    NProgress.done()
    fn.call(this,err)
    return Promise.reject(err);
  });

}

export default { ajax,ajaxShopping }
