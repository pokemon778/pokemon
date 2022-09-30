import axios from 'axios'
// import { ElMessage } from 'element-plus'


// eslint-disable-next-line no-undef
// switch (process.env.NODE_ENV) {
//   case 'development':
//     axios.defaults.baseURL = '/db'
//     break
//   case 'production':
//     axios.defaults.baseURL = 'http://47.96.0.211:9000/db'
//     break
// }

// eslint-disable-next-line no-undef
switch (process.env.NODE_ENV) {
  case 'development':
    axios.defaults.baseURL = 'http://121.89.205.189:3001/admin'
    break
  case 'production':
    axios.defaults.baseURL = 'http://121.89.189:3001/admin'
    break
}
// 设置请求的超时时间
axios.defaults.timeout = 50000
// axios携带额外的凭证(如果将本地cookie发送给后端的话，需要将此标志变成true)
axios.defaults.withCredentials = false

// 设置axios的请求之前的拦截器
axios.interceptors.request.use((config) => {
  let token = localStorage.getItem('token')
  token && (config.headers.token = token)
  return config
})

// 设置axios的响应之后的拦截器 
// http://www.cnblogs.com/chaoyuehedy/p/9931146.html
axios.interceptors.response.use((response) => {
    console.log('axios的响应拦截器---',response)
    if(response.data?.data?.token){
        localStorage.setItem('token',response.data.data.token)
    }
    // eslint-disable-next-line no-undef
    ElMessage({
        type:response.data?.code ==='200'? 'success' : 'error',
        message:response.data?.message
    })
  return response.data
})

export default axios
