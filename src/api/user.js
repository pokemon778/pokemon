import request from '@/service'
export function login(data){
    return request({
        url:'/admin/login',
        method:'post',
        data
    })
}
export function getManagerList(){
    return request({
        url:'admin/list',
        method:'get'
    })
}
export function deleteManagerListById(data){
    return request({
        url:'admin/delete',
        method:'post',
        data
    })
}
export function addManagerAdd(data) {
    return request({
      url: '/admin/add',
      method: 'post',
      data
    })
  }
  export function adminUpdate(data) {
    return request({
      url: '/admin/update',
      method: 'post',
      data
    })
  }