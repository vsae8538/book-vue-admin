<template>
  <div class="app-container">

    <div align="right">
      <el-button type="success" @click="addBook()">新增書籍</el-button>
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
      <el-table-column label="書籍名稱"  width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="書籍封面"  width="200" align="center">
        <template slot-scope="scope">
          <!--{{ scope.row.imageUrl }}-->
              <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.imageUrl"
                  ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否公開" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.isPublish }}
        </template>
      </el-table-column>
      <el-table-column label="書籍目錄" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.categoryName }}
        </template>
      </el-table-column>
          <el-table-column label="定價" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      </el-table-column>
          <el-table-column label="導讀" width="500" align="center">
        <template slot-scope="scope">
          {{ scope.row.introduction }}
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editBook(scope.row.id)">
            編輯
          </el-button>
          <el-button size="mini" type="danger" @click="deleteBook(scope.row.id)">
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
    //this.fetchData()
    this.getList()
  },
  methods: {
    getList() {
      var vm = this;
      this.axios({
        method:'POST',
        url:'http://localhost:8085/book/query',
        data:{
          pageIndex: vm.listQuery.page,
	        pageSize: vm.listQuery.limit
        }
      }).then(function(resp){
          vm.list = resp.data.data.pageData
          vm.total = resp.data.data.total
          console.log(resp)
        });
    },

    addBook(){
      this.$router.push("/addBook/index");
    },
    editBook(id){
      this.$router.push("/editBook/index/"+id);
    },
    deleteBook(id){
      var vm = this;
      this.axios({
        method: 'DELETE',
        url: 'http://localhost:8085/book/delete/'+id
      }).then(function(resp){
        console.log(resp);
        console.log(resp.data.message)
        if(resp.data.message == "success"){
          //彈框
          vm.$message({
            message: '刪除成功',
            type: 'success'
          });
          //vm.fetchData(); //更新書籍列表
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
    },
    fetchData() {
        var vm = this;
        this.axios({
          method: 'post',
          url: 'http://localhost:8085/book/query',
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
