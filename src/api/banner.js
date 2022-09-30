import request from '@/service'
export function getBannerList(data){
    return request({
        url:'/banner/list',
        method:'get',
        params:{
            ...data
        }
    })
}
export function deleteBannerList(data){
    return request({
        url:'/banner/delete',
        method:'get',
        params:{
            ...data
        }
    })
}

export function addBannerList(data){
    return request({
        url:'/banner/add',
        method:'post',
        data
    })
}