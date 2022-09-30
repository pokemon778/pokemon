<template>

    <el-container>
      <el-aside width="200px">
         <div class="loginBox">
            <el-image style="width:32px;height:32px" :src="imgUrl"></el-image>
            <h3 v-show="flag">嗨够管理后台</h3>
        </div>
            <MenuComp :isCollapse="!flag"></MenuComp>
        </el-aside>
    
    <el-container>
      <el-header>
        <el-icon :size="30" @click="flag=!flag">
         <component :is="flag? 'Fold':'Expand'"></component>
        </el-icon>
        <div class="welcome demo-type">
            <h6> 欢迎您: {{userInfo.adminname}}</h6>
            <el-dropdown>     
                <div>
            <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
        </div>            
                <template #dropdown>
                    <el-dropdown-item>设置</el-dropdown-item>
                    <el-dropdown-item @click="back">退出</el-dropdown-item>
                </template>
            </el-dropdown>
            
        </div>
      </el-header>
      <BreadCrumb></BreadCrumb>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>

</template>

<script>
import { defineComponent } from 'vue'
import { Expand } from '@element-plus/icons-vue'
import { Fold } from '@element-plus/icons-vue'
import MenuComp from '@/components/MenuComp.vue'
import imgUrl from '@/img/login.jpg'
import { UserFilled } from '@element-plus/icons-vue'
import {mapMutations,mapState} from 'vuex'
import BreadCrumb from '@/components/BreadCrumb.vue'

export default defineComponent({
    name: 'home',
    components: {
        Expand,
        Fold,
        MenuComp,
        UserFilled,
        BreadCrumb
    },
    data() {
        return {
            flag: true,
            imgUrl,
        }
    },
    computed: {
        asideWidth() {
            return this.flag ? '200px' : '64px'
        },
        ...mapState(['userInfo'])

    },
    methods:{
        ...mapMutations(['updateUserInfo']),
        back(){
            localStorage.removeItem('token'),
            this.updateUserInfo({}),
            this.$router.push('/login')
        }
    }
})
</script>

<style lang="scss" scoped>
.el-container {
    height: 100%;
    background-color: #dfe6e9;

    .el-aside {
        width: v-bind(asideWidth);
        background-color: #2d3436;
        transition: 0.5s all;
    }

    .el-header {
        background-color: #7f8fa6;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .loginBox {
        widows: 100%;
        height: 64px;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    h3 {
        color: #fff;
        margin-left: 15px;
    }

    .welcome {
        height: 100%;
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .welcome h6 {
        margin-right: 10px;
        // width: 100px;
        display: flex;
    }

}
</style>