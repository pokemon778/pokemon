<template>
<div class="bannerlist-container">
    <div id="addBannerList">
        <el-button @click="addBannerList" type="primary">
        添加轮播图 <el-icon class="el-icon--right"><Plus/></el-icon>
      </el-button>
    </div>
    <el-table max-height="440" :data="computedTableData" style="width: 100%"
    :header-cell-style="HeaderCellStyle"
     :cell-style="{textAlign:'center'}">
    <el-table-column prop="date" label="序号" type="index" width="180" />
    <el-table-column prop="img" label="图片" width="180">
        <template #default="scope">
            <el-image :src="scope.row.img"></el-image>
        </template>
    </el-table-column>
    <el-table-column prop="link" label="链接" />
    <el-table-column prop="alt" label="提示" />
    <el-table-column  label="操作">
        <template #default="scope">
            <el-button size="small" 
            type="danger" @click="handleDelete(scope.row.bannerid)">x</el-button>
        </template>
    </el-table-column>

  </el-table>
  <el-pagination 
  background layout="prev, pager, next" 
  :total="tableData.length"
  v-model:current-page="currentPage"
  v-model:page-size="pageSize" />
</div>
</template>

<script>
import {defineComponent} from 'vue'
import {getBannerList , deleteBannerList} from '@/api/banner.js'
import { Plus } from '@element-plus/icons-vue'


export default defineComponent({
    components:{
        Plus
    },
    methods:{
        handleDelete(bannerid){
            deleteBannerList(bannerid).then(res=>{
                console.log(res)
                this.getBannerListData()
            })
        
        },
        getBannerListData(){
            getBannerList().then(res=>{
            this.tableData = res.data
        })
        },
        addBannerList(){
            this.$router.push({name:'addBannerList'})
        }
    },
    data(){
        return{
            currentPage:1,
            pageSize:6,
            tableData:[],
            HeaderCellStyle: {
                color: 'rgba(0,0,0,0.85)',
                fontWeight: '700',
                fontSize: '14px',
                textAlign: 'center',
                background: '#f8f8f8',
                height: '60px',
                borderRight: '1px solid #f0f0f0',
                transition: 'background .3s ease'
            },
        }
    },
    created(){
        this.getBannerListData()
    },
    computed:{
        computedTableData(){
            return this.tableData.slice(
                (this.currentPage - 1) * this.pageSize,
                (this.currentPage - 1) * this.pageSize + this.pageSize
            )
        }
    }
})
</script>

<style lang="scss" scoped>
    .bannerlist-container{
        height: 100%;   
        padding:24px;
        background-color: #fff;
        
    }
    .el-pagination{
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;
    }
</style>