<template>
    <div class="header">
      <el-button @click="addmanager" type="primary">
        添加管理员 <el-icon class="el-icon--right"><Plus/></el-icon>
      </el-button>
    </div>
<div>
    <el-table
    max-height="380" 
     :data="computedTableData" style="width: 100%"
     :header-cell-style="HeaderCellStyle"
     :cell-style="{textAlign:'center'}">
    <el-table-column type="index" label="序号" width="180" />
    <el-table-column prop="adminname" label="账号" width="280" />
    <el-table-column prop="role" label="权限" width="180">
        <template #default="scope" >
            <el-tag :type="scope.row.role===1? '':'success'">{{scope.row.role === 1? '管理员':'超级管理员'}}</el-tag>
        </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination 
  background layout="prev, pager, next" 
  :total="tableData.length"
  v-model:current-page="currentPage"
  v-model:page-size="pageSize" />

</div>
<el-drawer v-model="showDrawer">
    <template #title>
        <h4>{{interFaceType===1? '添加管理员':'编辑管理员'}}</h4>
    </template>
   
  <template #default>
    <el-form
    label-width="100px"
    :model="FormData"
    style="max-width: 460px"
  >
    <el-form-item label="账户">
      <el-input v-model="FormData.adminname" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="FormData.password" />
    </el-form-item>
    <el-form-item label="角色">
        <el-select v-model='FormData.role' class="m-2" placeholder="请选择角色">
            <el-option label="管理员" value="1"  />
            <el-option label="超级管理员" value="2"  />
         </el-select>
    </el-form-item>
    <el-form-item label="权限" >
        <el-tree
        ref="treeRef"
        :data="menus"
        show-checkbox
        node-key="path"
        default-expand-all
        :default-checked-keys="defaultCheckedKeys"
        
        />
    </el-form-item>
  </el-form>
  </template>

  <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button v-if="interFaceType===1" type="primary" @click="confirmClick">添加</el-button>
        <el-button v-else type="primary" @click="writeFinished">编辑</el-button>

      </div>
    </template>
  </el-drawer>
</template>



<script>
import { defineComponent } from 'vue'
import { getManagerList, deleteManagerListById,addManagerAdd,adminUpdate } from '@/api/user';
import { Plus } from '@element-plus/icons-vue'
import {routes} from '@/router'
import { mapMutations, mapState } from 'vuex';
import _ from 'lodash'


export default defineComponent({
    components: {
        Plus
    },
    data() {
        return {

            defaultCheckedKeys:[],
            interFaceType : 1,
            menus:routes[0].children,
            FormData:{
                adminname:'',
                password:'',
                role:'1',
                checkedKeys:[]
            },
            showDrawer: false,
            tableData: [],
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
            currentPage: 1,
            pageSize: 10
        }
    },
    created() {
      this.initMenu()
        this.getTableList()
    },
    methods: {
      ...mapMutations(['updateUserInfo']),
      initMenu(){
        const cloneRoutes = _.cloneDeep(this.menus)
        cloneRoutes[0].children.pop()
        this.menus = cloneRoutes
      },

        writeFinished(){
          // console.log('编辑完了')
          this.setCheckedKeys()
          // eslint-disable-next-line no-unused-vars
          adminUpdate(this.FormData).then((res)=>{
            // console.log('编辑完成的---》',res)
            this.getTableList()
            this.showDrawer = false
          })
          if(this.FormData.adminname===this.userInfo.adminname){
            this.userInfo.checkedkeys = this.FormData.checkedKeys
            this.updateUserInfo(this.userInfo)
          }
         },
        addmanager(){
        this.showDrawer=true
        this.clearElTree() 
        this.interFaceType=1
        },
        cancelClick(){
        this.showDrawer = false 
        },
        clearElTree(){
          this.FormData.adminname=''
          this.FormData.password=''
          this.FormData.role='1'
          this.FormData.checkedKeys=[]
          this.$refs.treeRef?.setCheckedKeys([])
        },
        confirmClick() {
          this.setCheckedKeys()
          this.addManager()
        },

        
        setCheckedKeys(){
          let list = this.$refs.treeRef.getCheckedNodes(true)
          const tempList = []
          const result = []
          list.forEach((item) => {
            const parent = this.menus.find((mitem) => {
                return mitem.children.some((child) => child.label === item.label)
            })
           if (!tempList.includes(parent.label)) {
              tempList.push(parent.label)
              result.push({
                label: parent.label,
                path: parent.path,
                children: [item]
            })
            } else {
              result.find((item) => item.label === parent.label).children.push(item)
            }
            })
            // console.log('result--->', result)
            this.FormData.checkedKeys = result
            
        },
        
        handleEdit(row) {
          this.interFaceType = 2
          this.showDrawer = true
          console.log('row---',row)
          this.FormData.adminname = row.adminname
          this.FormData.password = row.password
          this.FormData.role = row.role.toString()
          const checkedKeys = []
          row.checkedKeys.forEach((parent)=>{
            parent.children.forEach((child)=>{
              checkedKeys.push(child.path)
            })
          })
          // this.$refs.treeRef.setCheckedKeys(checkedKeys)
          this.defaultCheckedKeys = checkedKeys
          console.log( 'aaaaa',this.defaultCheckedKeys)
          if(this.$refs.treeRef){
            this.$refs.treeRef.setCheckedKeys(checkedKeys)
          }
          // console.log('checkedKeys--->', checkedKeys )
        },
        addManager(){
          // eslint-disable-next-line no-unused-vars
          addManagerAdd(this.FormData).then(_res=>{
            // console.log('res-->',res)
            this.showDrawer = false      
            this.getTableList()
          })
        },        
        handleDelete(row) {
            // eslint-disable-next-line no-unused-vars
            deleteManagerListById({ adminid: row.adminid }).then(res => {
                // console.log(res)
                this.currentPage = 1
                this.getTableList()
            })
        },
        getTableList() {
            getManagerList().then(res => {
                // console.log('res---', res)
                this.tableData = res.data
            })
        }

    },

    computed: {
      ...mapState(['userInfo']),
        computedTableData() {
            return this.tableData.slice(
                (this.currentPage - 1) * this.pageSize,
                (this.currentPage - 1) * this.pageSize + this.pageSize
            )
        }
    }
})
</script>

<style lang="scss" scoped>

</style>