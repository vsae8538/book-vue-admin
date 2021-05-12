<template>
  <div class="app-container">

    <div align="right">
      <el-button type="success" @click="addUser()">新增使用者</el-button>
    </div>
    <div align="right">
      <span></br></span>
    </div>
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序列號" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名"  width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column label="密碼" width="210" align="center">
        <template slot-scope="scope">
          <span> ******* </span>
        </template>
      </el-table-column>
      <el-table-column label="電子信箱" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="電話" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.telPhone }}
        </template>
      </el-table-column>
            <el-table-column label="備註" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.memo }}
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editUser(scope.row.id)">
            編輯
          </el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)">
            刪除
          </el-button>
        </template>
      </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>

    

</template>

<script>

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { queryUserList, deleteUser } from '@/api/user'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      var vm = this;

      queryUserList(vm.listQuery).then(response =>{
          vm.list = response.data.pageData
          vm.total = response.data.total
          console.log(response)
      })
    },

    addUser(){
      this.$router.push("/addUser/index");
    },
    editUser(id){
      this.$router.push("/editUser/index/"+id);
    },
    deleteUser(id){
      var vm = this;

      deleteUser(id).then(response => {
        if(response.message == "success"){
          vm.$message({
            message: '刪除成功',
            type: 'success'
          });
          vm.list = null;
          vm.getList();
        }else{
          vm.$message({
            message: '刪除失敗',
            type: 'error'
          });
        }
      }).catch(function(error){
          vm.$message.error('刪除失敗');
      });
    }
  }
}
</script>
