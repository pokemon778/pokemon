import request from '@/service'
export function getProductionList(data){
    return request({
        url:'/pro/list',
        method:'get',
        params:{
            ...data
        }
    })
}
export function updateProduction(data){
    return request({
        url:'/pro/updateFlag',
        method:'post',
        data
        
    })
}

export function getProductionKillList(data){
    return request({
        url:'/pro/showdata',
        method:'post',
        data
        
    })
}
export function FilterList(data){
    return request({
        url:'/pro/searchPro',
        method:'post',
        data
        
    })
}
export function getCategory(data){
    return request({
        url:'/pro/getCategory',
        method:'get',
        params:{
            ...data
        }
        
    })
}