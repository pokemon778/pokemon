<template>
    <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="i in crumbList" :key="i" :to="{ name: i.name }">{{i.label}}</el-breadcrumb-item>
    
  </el-breadcrumb>
</template>

<script>
import {defineComponent} from 'vue'
import {routes} from '@/router'
import { mapMutations } from 'vuex'

export default defineComponent({
    data(){
            this.routesMap = new Map()
            this.initRouteMap(routes)
            return{
            
            crumbList:[], 
            
        }
    },
    methods:{
        ...mapMutations(['updateCurrentPath']),
        initRouteMap(routes){
      routes.forEach(route=>{
        this.routesMap.set(route.name,route.label)
        if(route.children){
          this.initRouteMap(route.children)
        }
      })
    }
  },
    
  watch:{
    $route:{
      immediate:true,
      handler(route){
        console.log('$$$',route)
        // 切换路由的时候，保存vuex的currentpath（从登录进行跳转，不能一直跳登录界面）
        route.path !== '/login' && this.updateCurrentPath(route.path)
        this.crumbList = route.matched.map(item=>{
          return {
            name:item.name,
            label:this.routesMap.get(item.name)
          }
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .el-breadcrumb{
    margin-top: 10px;
    margin-left: 20px;
  }
  
</style>