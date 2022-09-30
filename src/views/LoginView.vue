<template>
   <div class="login-container">
    <div class="form-warp">
        <h3 class="header">嗨够管理系统</h3>
        
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item prop="adminname">
            <el-input placeholder="请输入用户名" v-model="ruleForm.adminname" autocomplete="off" >
                <template #prefix>
                    <el-icon :size="size" :color="color">
                     <User />
            </el-icon>
                </template>
                </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="ruleForm.password" type="password" autocomplete="off">
                <template #prefix>
                    <el-icon :size="size" :color="color" class='is-loading'>
                   <Tools/>
                  </el-icon>
                 </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="conpassword">
            <el-input placeholder="再次输入密码" v-model="ruleForm.conpassword" type="password" autocomplete="off">
                <template #prefix>
                    <el-icon :size="size" :color="color" class='is-loading'>
                   <Tools/>
                  </el-icon>
                 </template>
            </el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"
              >Submit</el-button
            >
           
          </el-form-item>
        </el-form>
    </div>
   </div>
  </template>
  
<script>
import { defineComponent } from 'vue'
import { User, Tools } from '@element-plus/icons-vue'
import { login } from '@/api/user'
import { mapMutations,mapState} from 'vuex'

export default defineComponent({
    computed:{
    ...mapState(['currentPath']),
  },
submitForm(formEl){
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!')
          login({
            adminname:this.ruleForm.username,
            password:this.ruleForm.password
          }).then(res=>{
            // 跳转到首页|保存用户信息|用户如果登录了，不需要重新登录
            this.updateUserInfo(res.data)
            // 从vuex中获取路径，跳转！ 如果currentPath存储login，则死循环了
      this.$router.push({path:this.currentPath||'/'}) //this.$router.push({path:JSON.parse(localStorage.getItem('vuex'))?.currentPath||'/'})
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    components: {
        User,
        Tools
    },
    data() {
        return {
            ruleFormRef: null,
            ruleForm: {
                adminname: '',
                password: '',
                conpassword:''
            },
            rules: {
                adminname: [{ required: true, trigger: 'blur' }],
                password: [{ required: true, trigger: 'blur' }],
                conpassword: [{ required: true, trigger: 'blur',validator:this.validatorpsw}]


            },
            size: '18px',
            color: 'pink',

        }
    },
    mounted() {
        this.ruleFormRef = this.$refs.ruleFormRef
    },
    methods: {
        ...mapMutations(['updateUserInfo']),
        validatorpsw(rule,value,callback){
            if(value!==this.ruleForm.password){
                callback(new Error('两次输入的密码不一致'))
            }else{
                callback()
            }
        },

        submitForm(ruleFormRef) {
            if (!ruleFormRef) return
            ruleFormRef.validate((valid) => {
                if (valid) {
                    login({
                        adminname: this.ruleForm.adminname,
                        password: this.ruleForm.password
                    }).then((res) => {
                        console.log('res---', res)
                        this.updateUserInfo(res.data)
                        this.$router.push({name:'home'})
                    })
                   
                    console.log('submit!')
                } else {
                    console.log('error submit!')
                    return false
                }
            })
        }

    }
})
</script>
<style lang="scss" scoped>
.login-container {
    height: 100%;
    background: #2b3c4d;

    .form-warp {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .header {
            color: #fff;
            text-align: center;
            margin-bottom: 32px;
        }
    }

    .el-form {
        background: #fff;
        width: 320px;
        padding: 32px 32px 20px 32px;
        border-radius: 10px;

        .el-button {
            width: 100%;
            margin-top: 15px;
        }
    }
}
</style>