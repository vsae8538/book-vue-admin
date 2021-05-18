<template>
  <div class="app-container">

  <div class="filter-container">
    <el-input v-model="listQuery.categoryName" placeholder="category Name" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
    <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
      Search
    </el-button>
  </div>

    <div align="right">
      <el-button type="success" @click="addCategory()">新增目錄</el-button>
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
          {{ scope.row.categoryName }}
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="1000" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editCategory(scope.row.id)">
            編輯
          </el-button>
          <el-button size="mini" type="danger" @click="deleteCategory(scope.row.id)">
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
import { queryCategoryList, deleteCategory } from '@/api/category'
import waves from '@/directive/waves' // waves directive

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        categoryName: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      var vm = this;
      queryCategoryList(vm.listQuery).then(response => {
        vm.list = response.data.pageData;
        vm.total = response.data.total;
      }).catch(function(error){
          vm.$message.error('沒有目錄');
          vm.list = null;
      });
    },
    addCategory(){
      this.$router.push("/addCategory/index");
    },
    editCategory(id){
      this.$router.push("/editCategory/index/"+id);
    },
    handleFilter() {
      var vm = this;
      vm.listQuery.page = 1;
      
      vm.getList();
    },
    deleteCategory(id){
      var vm = this;

      deleteCategory(id).then(resp => {
        console.log(resp);
        console.log(resp.message)
        if(resp.message == "success"){
          //彈框
          vm.$message({
            message: '刪除成功',
            type: 'success'
          });
          vm.list = null;
          vm.getList(); //更新目錄列表
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
