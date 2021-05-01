<template>
  <div class="app-container">

    <div align="right">
      <el-button type="success" @click="addAdmin()">新增管理員</el-button>
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
      <el-table-column label="目錄名稱"  width="500" align="center">
        <template slot-scope="scope">
          {{ scope.row.AdminName }}
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="1000" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editAdmin(scope.row.id)">
            編輯
          </el-button>
          <el-button size="mini" type="danger" @click="deleteAdmin(scope.row.id)">
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
      this.axios({
        method:'POST',
        url:'http://localhost:8085/admin/query',
        data:{
          pageIndex: vm.listQuery.page,
	        pageSize: vm.listQuery.limit
        }
      }).then(function(resp){
          vm.list = resp.data.data.pageData
          vm.total = resp.data.data.total
          console.log(resp)
        });
    }
    // ,
    // addAdmin(){
    //   this.$router.push("/addAdmin/index");
    // },
    // editAdmin(id){
    //   this.$router.push("/editAdmin/index/"+id);
    // },
    // deleteAdmin(id){
    //   var vm = this;
    //   this.axios({
    //     method: 'DELETE',
    //     url: 'http://localhost:8085/Admin/delete/'+id
    //   }).then(function(resp){
    //     console.log(resp);
    //     console.log(resp.data.message)
    //     if(resp.data.message == "success"){
    //       //彈框
    //       vm.$message({
    //         message: '刪除成功',
    //         type: 'success'
    //       });
    //       vm.list = null;
    //       vm.getList(); //更新目錄列表
    //     }else{
    //       vm.$message({
    //         message: '刪除失敗',
    //         type: 'error'
    //       });
    //     }
    //   }).catch(function(error){
    //       vm.$message.error('刪除失敗');
    //   });
    // },
    // fetchData() {
    //     var vm = this;
    //     this.axios({
    //       method: 'post',
    //       url: 'http://localhost:8085/Admin/query',
    //       data: {
    //         pageIndex: 1,
    //         pageSize: 10
    //       }
    //     }).then(function(resp){
    //       vm.list = resp.data.data.pageData
    //       //console.log(resp.data.data.pageData)
    //     });
    // }
  }
}
</script>
