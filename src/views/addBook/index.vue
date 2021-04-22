<template>
  <div class="app-container">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="書籍名稱">
          <el-input v-model="book.name" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="book.author" />
        </el-form-item>
          <el-form-item label="是否公開">
        <el-input v-model="book.isPublish" />
        </el-form-item>
          <el-form-item label="目錄">
            <el-select v-model="selectValue" placeholder="請選擇">
              <el-option
                v-for="item in selectList"
                :key="item.id"
                :label="item.categoryName"
                :value="item.id">
              </el-option>
            </el-select>
        <!--<el-input v-model="book.categoryId" />-->
        </el-form-item>
        <el-form-item label="導讀">
          <el-input v-model="book.introduction" />
        </el-form-item>
        <el-form-item label="書籍圖片">
          <el-input v-model="book.imageUrl" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onTest">新增書籍</el-button>
        </el-form-item>
</el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: {
        name: "",
        author: "",
        isPublish: null,
        categoryId: null,
        categoryName: "",
        price: -1,
        introduction: "",
        imageUrl: ""
      },
      selectList : null,
      selectValue: null
    }
  },

  created(){
    this.getCategorySelectList();
  },

  methods: {

    onTest(){
      var vm = this;
      vm.book.categoryId = vm.selectValue;
      console.log(vm.book.categoryId);
      console.log(vm.selectValue);
    },

    onSubmit() {
      var vm = this;
      
      this.axios({
        method: 'POST',
        url: 'http://localhost:8085/book/add',
        data: vm.book
        }).then(function(resp){
          console.log(resp)
          vm.$message({
            message: '新增成功',
            type: 'success'
          });
          vm.$router.push("/book")
        }).catch((error) => { 
          console.error(error) 
            vm.$message({
            message: '新增失敗',
            type: 'error'
          });
        })
    },

    getCategorySelectList(){
      var vm = this
      this.axios({
        method : 'POST', 
        url:'http://localhost:8085/category/query',
        data:{
          pageIndex: 1,
	        pageSize: 50
        }
        }).then(function(resp){
            vm.selectList = resp.data.data.pageData
            console.log(resp)
        });

    }

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

