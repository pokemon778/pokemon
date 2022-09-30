<template>
     <div id="addBannerList">
         <el-form
            ref="elForm"
            label-position="center"
            label-width="60px"
            :model="ruleForm"
            :rules="rules"
        >
            <el-form-item label="alt" prop="alt">
            <el-input v-model="ruleForm.alt" placeholder="请输入alt"/>
            </el-form-item>
            <el-form-item label="link" prop="link">
            <el-input v-model="ruleForm.link"  placeholder="请输入链接"/>
            </el-form-item>
            <el-form-item label="" >
                <el-upload
                    class="avatar-uploader"
                    :show-file-list="false"
                    :http-request="httpRequest"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                 </el-upload>
            </el-form-item>

            <el-form-item label="base64" prop="img">
                <el-input v-model="ruleForm.img" disabled placeholder="请上传照片"/>
            </el-form-item>

            <el-form-item>
                 <el-button type="primary" @click="onSubmit(ruleFormRef)">确认</el-button>
            </el-form-item>
      </el-form>
     </div>
</template>

<script>
import {defineComponent} from 'vue'
import { Plus } from '@element-plus/icons-vue';
import {addBannerList} from '@/api/banner.js'

export default defineComponent({
    mounted(){
            this.ruleFormRef = this.$refs.elForm
        },
    methods:{
      onSubmit(a){
            if (!a) return
            a.validate((valid) => {
            if (valid) {
            console.log('submit!')
            addBannerList(this.ruleForm).then(res=>{
                this.$router.push({name:'bannerlist'})
            })
            addBanner(this.a).then(res=>{
                console.log('add-->',res)
                
            })
            } else {
            console.log('error submit!')
            return false
            }
            })
        },
        httpRequest(data){
            console.log("httprequest--->", data.file)
             // 限制文件类型，必须是图片类型
            const typeRight = ['image/jpeg','image/jpg','image/png'].includes(data.file.type)
            // 限制图片大小
            const sizeRight = data.file.size / 1024 / 1024 < 2
            if(!typeRight){
                ElMessage.error('文件类型不正确')
                return false
            }else if(!sizeRight){
                ElMessage.error('图片大小高于2M')
                return false
            }
            this.imageUrl = URL.createObjectURL(data.file)
            this.getBase64(data.file).then(res=>{
                // console.log("getbase----", res)
              this.ruleForm.img = res
            }).catch(res=>console.log(err))
        },
        
        getBase64(file){
             return new Promise((resolve,reject)=>{
            let reader = new FileReader()
            let fileResult = ''
            reader.readAsDataURL(file)
            reader.onload = ()=>{
            fileResult = reader.result
            }
            reader.onerror = err=>{
            reject(err)
            }
            reader.onloadend = ()=>{
            resolve(fileResult)
            }   
        })
        }
       
    },
    components:{
        Plus
    },
    data(){
        return{
            ruleFormRef:null,
            ruleForm:{
                img:'',
                alt:'',
                link:'',
                
            },
            imageUrl:'',
            rules:{
                link:[{required:true,message:'必须输入link',trigger:'blur'}],
                alt:[{required:true,message:'必须输入alt',trigger:'blur'}],
                img:[{required:true,message:'必须上传照片',trigger:'blur'}],

            }
        }
    }
})
</script>

<style lang="scss" scoped>
    #addBannerList{
        width: 400px;
        height: 100%;
        margin-top: 30px;
    }
    .avatar-uploader .avatar {
        width:300px;
        height: 300px;
        
        }
    
        .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
        background-color: #fff;
        }
</style>