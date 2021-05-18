<template>
  <div class="app-container">
  <div class="filter-container">
    <el-input v-model="listQuery.username" placeholder="username" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
    <el-input v-model="listQuery.telPhone" placeholder="telPhone" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
    <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
      Search
    </el-button>
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
      <el-table-column label="管理員名稱"  width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="密碼"  width="300" align="center">
        <template slot-scope="scope">
          **********
        </template>
      </el-table-column>
      <el-table-column label="電子信箱"  width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="電話"  width="250" align="center">
        <template slot-scope="scope">
          {{ scope.row.telPhone }}
        </template>
      </el-table-column>
            <el-table-column label="頭像"  width="150" align="center">
        <template slot-scope="scope">
              <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.avatar"
              ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editAdmin(scope.row.id)">
            編輯
          </el-button>
        </template>
      </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>

    

</template>

<script>

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { queryAdminList } from '@/api/admin'
import waves from '@/directive/waves' // waves directive

export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        username: undefined,
        telPhone: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      var vm = this;
      queryAdminList(vm.listQuery).then(response =>{
          vm.list = response.data.pageData
          vm.total = response.data.total
      }).catch(function(error){
          vm.list = null;
      });
    },
    handleFilter() {
      var vm = this;
      vm.listQuery.page = 1;
      
      vm.getList();
    },
    editAdmin(id){
      this.$router.push("/editAdmin/index/"+id);
    }
  }
}
</script>
