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
      <el-table-column label="管理員名稱"  width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="密碼"  width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.password }}
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
        url:'http://localhost:8085/system/query',
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
    ,
    editAdmin(id){
      this.$router.push("/editAdmin/index/"+id);
    }
  }
}
</script>
