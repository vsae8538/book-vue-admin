<template>
   <div class="app-container">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="書籍名稱">
          <el-input v-model="book.name" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="book.author" />
        </el-form-item>
        <el-form-item label="定價">
          <el-input v-model="book.price" />
        </el-form-item>
          <el-form-item label="是否公開">
          <el-tooltip :content="'是否開啟: ' + (isPublishValue == 1 ? '是' : '否')" placement="top">
            <el-switch
                v-model="isPublishValue"
                active-value="1"
                inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
        </el-tooltip>
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
        </el-form-item>
        <el-form-item label="導讀">
          <el-input v-model="book.introduction" />
        </el-form-item>
      
        <el-form-item>
          <span></br></span>  
            <el-button type="primary" @click="onUploadSubmit">新增書籍</el-button>
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
        price: "",
        introduction: "",
        imageUrl: ""
      },
      selectList : null,
      selectValue: null,
      fileList : [],
      isPublishValue: 0,
      msg : ''
    }
  },

  created(){
    this.fetchDataById();
    this.getCategorySelectList();
  },

  methods: {
    fetchDataById(){
        var id = this.$route.params.id;
        var vm = this;
        this.axios({
          method: 'GET',
          url: 'http://localhost:8085/book/query/'+id
          }).then(function(resp){
            console.log(resp)
            //選擇列表填值
            vm.book = resp.data.data;
            vm.selectValue = vm.book.categoryId;
            console.log(vm.selectValue);
          })

    },
    onSubmit() {
      var vm = this;

      if(vm.book.imageUrl == '') {
        this.$message({
          message: '請選擇要上傳的文件',
          type: 'error'
        })
        return false
      }

      vm.book.categoryId = vm.selectValue;
      vm.book.isPublish = vm.isPublishValue;

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

