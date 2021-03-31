<template>
  <div class="app-container">
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
          <span>{{ scope.row.password }}</span>
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
<!--      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: 'success',
  //       draft: 'gray',
  //       deleted: 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // },
  data() {
    return {
//      list
      list: [{
        "id": 1,
	      "username" : "admin1",
	      "password" : "admin1",
        "email" : "admin@gmail.com",
        "telephone" : "0978990199",
        "memo" : "test"
      }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
        var vm = this;
        this.axios({
          method: 'post',
          url: 'http://localhost:8085/user/query',
          data: {
            pageIndex: 1,
            pageSize: 10
          }
        }).then(function(resp){
          vm.list = resp.data.data.pageData
          //console.log(resp.data.data.pageData)
        });
    }
  }
}
</script>
