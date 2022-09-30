<template>
  
    <el-menu
        active-text-color="#ffd04b"
        background-color="#2d3436"
        class="el-menu-vertical-demo"
        :default-active="currentPath"
        text-color="#fff"
     
        
        :collapse="isCollapse"
        router
      >
      <el-menu-item index="/">
            <el-icon><icon-menu /></el-icon>
            <span>首页</span>
      </el-menu-item>
            <el-sub-menu
      v-for="item in userInfo.checkedkeys"
      :index="'/' + item.path"
      :key="item.path"
    >
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item
        :key="child.path"
        v-for="child in item.children"
        :index="`/${item.path}/${child.path}`"
        >{{ child.label }}
        </el-menu-item
      >
    </el-sub-menu>
      <!-- </el-menu-item>
      <el-sub-menu index="manager">
          <template #title>
            <el-icon><location /></el-icon>
            <span>账户管理</span>
          </template>
          <el-menu-item index="/manager/managerlist">管理员列表</el-menu-item>
          <el-menu-item index="1-2">管理员</el-menu-item>
          </el-sub-menu>
      <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>信息列表</span>
      </el-menu-item> -->
        
      </el-menu>
</template>

<script>
import {defineComponent} from 'vue'
import {Location, Menu as IconMenu,} from '@element-plus/icons-vue'
import { mapState } from 'vuex';

export default defineComponent({
    components:{
        Location,
        IconMenu,
    },
    computed:{
      ...mapState(['userInfo','currentPath'])
    },
    props:{
        isCollapse:{
            type:Boolean,
            required:true
        }
    }
})


</script>

<style lang="scss" scoped>
    .el-menu{
        border:none
    }
</style>