import { createRouter, createWebHashHistory } from "vue-router";
export const routes = [
  {
    label:'首页',
    path:'/',
    name:'home',
    component:()=>import('@/views/HomeView.vue'),
    children:[
      
      {
        path:'banner',
        name:'banner',
        label:'轮播图管理',
        component:()=>import ('@/views/banner/BannerListIndex.vue'),
        children:[
          {
            path:'bannerlist',
            name:'bannerlist',
            label:'轮播图列表',
            component:() => import('@/views/banner/BannerListView.vue')
          },
          {
            path:'addBannerList',
            name:'addBannerList',
            label:'添加轮播图',
            component:() => import('@/views/banner/addBannerList.vue')
          },
       ]
     },
      {
         label:'用户管理',
        path:'manager',
        name:'manager',
        component:()=>import ('@/views/manager/ManagerIndexView.vue'),
        children:[
          {
            label:'管理员列表',
            path:'managerlist',
            name:'managerlist',
            component:() => import('@/views/manager/ManagerListView.vue')
          },
        ]
      },
      {
        path:'production',
        name:'production',
        label:'产品管理',
        component:()=>import('@/views/production/ProductionIndexView.vue'),
        children:[
          {
            path:'productionlist',
            name:'productionlist',
            label:'产品列表',
            component:()=>import('@/views/production/ProductionListView.vue'),
          },
          {
            path:'secskilllist',
            name:'secskilllist',
            label:'秒杀列表',
            component:()=>import('@/views/production/ProductionKillView.vue'),
          },
          {
            path:'recommendlist',
            name:'recommendlist',
            label:'推荐列表',
            component:()=>import('@/views/production/ProductionRecommendView.vue'),
          },
          {
            path:'categorylist',
            name:'categorylist',
            label:'筛选列表',
            component:()=>import('@/views/production/ProductionFlitersView.vue'),
          }
        ]
      },
      {
        path:'smallmap',
        name:'smallmap',
        label:'地图展示',
        component:()=>import('@/views/map/MapIndex.vue'),
        children:[
          {
            path:'smallmaplist',
            name:'smallmaplist',
            label:'青岛地图',
            component:()=>import('@/views/map/MapView.vue')
          }
        ]
      }
    ]
  },
  
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/LoginView.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 添加前置路由首位
const isLogin =()=>{
  return !!localStorage.getItem('token')
}
// eslint-disable-next-line no-unused-vars
router.beforeEach((to,from)=>{
  if(to.name==='login'){
    if(isLogin()){
      // eslint-disable-next-line no-undef
      ElMessage('登录状态有效，不需要重复登录')
      return {name:'home'}
    }
  }else if(to.name ==='home'){
    if(!isLogin()){
      return {name:'login'}
    }
  }
})
export default router;
