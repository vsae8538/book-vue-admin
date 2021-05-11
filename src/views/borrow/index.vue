<template>
  <div class="app-container">
      <div align="right">
      <el-button type="success" @click="addBorrow()">新增借閱</el-button>
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
          <el-button v-if="scope.row.isReturn === 0" type="primary" size="mini" @click="borrowing(scope.row.id)">
            還書
          </el-button>
          <div v-else-if="scope.row.isReturn === 1">
            已還書
          </div>
        </template>
      </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>

    

</template>

<script>

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { returnBook , queryBorrowingList } from '@/api/borrow'


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
      queryBorrowingList(vm.listQuery).then(response =>{
          vm.list = response.data.pageData
          vm.total = response.data.total
          console.log(response)
      })
    },
    addBorrow(){
      this.$router.push("/addBorrow/index");
    },
    borrowing(id){
      var vm = this;

      returnBook(id).then(response =>{
        console.log(response);
        if(response.message == "success"){
          //彈框
          vm.$message({
            message: '還書成功',
            type: 'success'
          });
          vm.list = null;
          vm.getList();
        }else{
          vm.$message({
            message: '還書失敗',
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
