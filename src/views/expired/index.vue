<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.username" placeholder="username" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.bookName" placeholder="book Name" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column label="借閱者" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="書籍名稱"  width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookName }}
        </template>
      </el-table-column>
      <el-table-column label="書籍封面"  width="200" align="center">
        <template slot-scope="scope">
              <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.bookImageUrl"
              ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="是否到期" width="80" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isExpired == 1 ? true : false"
             active-color="#13ce66"
             inactive-color="#ff4949"
            disabled>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="借閱日期" width="250" align="center">
        <template slot-scope="scope">
          {{ scope.row.borrowDate }}
        </template>
      </el-table-column>
      <el-table-column label="借閱期限" width="250" align="center">
        <template slot-scope="scope">
          {{ scope.row.borrowingDeadLine }}
        </template>
      </el-table-column>
      <el-table-column  label="Actions" align="center" width="330" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <div>
            已逾期
          </div>
        </template>
      </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>

    

</template>

<script>

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { queryExpiredBorrowingBooksList } from '@/api/borrow'
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
        username: "",
        bookName: ""
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      var vm = this;

      queryExpiredBorrowingBooksList(vm.listQuery).then(response =>{
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
    }
  }
}
</script>
