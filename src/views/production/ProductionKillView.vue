<template>
    <div class="production-container">
        <el-table    
        max-height="550"
         :data="computedTableData" style="width: 100%;"
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
        <el-table-column prop="sales" sortable label="销量"  />
        <el-table-column prop="brand" label="品牌" />
        <el-table-column prop="category" label="种类"  
        :filters="filters"
        :filter-method="filterHandler"
        />
        <el-table-column prop="proname" label="介绍"  />
        
        <el-table-column prop="isseckill" label="是否秒杀"  >
          <template #default="scope">
            <el-switch v-model="scope.row.isseckill" 
            :active-value='1'
            :inactive-value='0'
            :disabled="disabled"
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
          layout="total,sizes,prev, pager, next,jumper"
          :total="computedTableData"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          @current-change="currentChange" />
    </div>
    </template>
    
    <script>
    import {defineComponent} from 'vue'
    import{ getProductionList,updateProduction,getProductionKillList } from '@/api/production.js'
    
    
    export default defineComponent({
        data(){
            return{
                
                total:0,
                pageSize:8,
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
            }).then(()=>{
                this.disabled = false
            this.getProduction()
            })
            

          },
          currentChange(){
            console.log('currentpage---->',this.currentPage)
            this.getProduction()
          },
          getProduction(){
            getProductionKillList({
                type:'isseckill',
                flag:0
            }).then(res=>{
                console.log(res)
                this.tableData = res.data
                
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
    </style>