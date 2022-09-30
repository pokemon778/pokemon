<template>
<div class="production-container">
    <el-space>
      <el-select v-model="searchVal" class="m-2" placeholder="Select" size="large">
      <el-option label="全部" value=""></el-option>
      <el-option
        v-for="item in categoryData"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <el-input v-model="searchContent" placeholder="请输入搜索的内容"></el-input>
    <el-button type="success" @click="search">搜索</el-button>
    </el-space>

    <el-table    
    max-height="550"
     :data="tableData" style="width: 100%;"
     :header-cell-style="HeaderCellStyle"
     :cell-style="{textAlign:'center'}">
    <el-table-column type="index" label="序号" width="80" />
    <el-table-column prop="img1" label="图片" width="160">
      <template #default="scope">
        <el-image :src="scope.row.img1"
        :preview-src-list="[
          scope.row.img1,
          scope.row.img2,
          scope.row.img3,
          scope.row.img4,
          ]"
          preview-teleported
        ></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="sales" sortable label="销量" width="100" />
    <el-table-column prop="brand" label="品牌" width="120" />
    <el-table-column prop="category" label="种类" width="120" 
    :filters="filters"
    :filter-method="filterHandler"
    />
    <el-table-column prop="proname" label="介绍" width="150" />
    <el-table-column prop="isrecommend" label="是否推荐" width="100" >
      <template #default="scope">
        <el-switch v-model="scope.row.isrecommend" 
        :active-value='1'
        :inactive-value='0'
        @change="changeSwitch(scope.row.proid,'isrecommend',scope.row.isrecommend)"/>
      </template>
    </el-table-column>
    <el-table-column prop="isseckill" label="是否秒杀" width="100" >
      <template #default="scope">
        <el-switch v-model="scope.row.isseckill" 
        :active-value='1'
        :inactive-value='0'
        @change="changeSwitch(scope.row.proid,'isseckill',scope.row.isseckill)"/>
      </template>
    </el-table-column>
    

    <el-table-column prop="brand" label="品牌" width="180"> 
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-popconfirm title="确定要删除吗?"
        @confirm=""
        >
        <template #reference>
          <el-button type="danger">删除</el-button>
        </template>
        </el-popconfirm>
      </template>
      
    </el-table-column>
  </el-table>
  <el-pagination 
  layout="prev, pager, next"
      :total="tableData.length"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      @current-change="currentChange" />

    
</div>
</template>

<script>
import {defineComponent} from 'vue'
import{ getProductionList,updateProduction,getCategory,FilterList} from '@/api/production.js'
import { before } from 'lodash'


export default defineComponent({
    data(){
        return{
          searchContent:'', 
            searchVal:'',
            categoryData:[],
            total:0,
            pageSize:150,
            currentPage :1,
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
    
    methods:{
      currentChange(){
            console.log('currentpage---->',this.currentPage)
            this.getProduction()
          },
      search(){
        console.log(this.searchVal,this.searchContent)
        FilterList({
          category:this.searchVal,
          search:this.searchContent
        }).then(res=>{
            this.tableData = res.data
        })
      },
      filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
      changeSwitch(proid,type,flag){
        console.log(proid,type,!!flag)
        updateProduction({
          proid,
          type,
          flag:!!flag
        })
      },
      
      getProduction(){
        getProductionList({
            count:this.currentPage,
            limitNum:this.pageSize
        }).then(res=>{
            console.log(res)
            this.tableData = res.data
            
        })
      },
     getCategoryData(){
        getCategory({
            code:'',
            message:'',
            data:''
        }).then((res)=>{
            this.categoryData = res.data
            console.log(this.categoryData)
        })
     }
    },
    computed:{
      computedTableData(){
            return this.tableData.slice(
                (this.currentPage - 1) * this.pageSize,
                (this.currentPage - 1) * this.pageSize + this.pageSize
            )
        },
      filters(){
        let arr = this.tableData.map(item=>item.category)
        arr = [...new Set(arr)]
        // console.log('arr......',arr)

        return arr.map((item)=>{
          return{
            text:item,
            value:item
          }
        })
      }
    },
    created(){
      this.getProduction()
      this.getCategoryData()
    }
    
})



</script>

<style lang="scss" scoped>
 .production-container{
  height: 100%;
  widows: 400px;
 }
 .cell{
  background-color: red;
 }
 .el-button--small{
  padding:10px 5px
 }
 .el-pagination{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
 } 
  :deep .el-input__wrapper{
  height: 30px;
  margin-bottom: 5px;
 }
 .el-button{
  margin-bottom: 5px;
 }
</style>