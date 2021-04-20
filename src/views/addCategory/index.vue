<template>
  <div class="app-container">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="目錄名稱">
          <el-input v-model="category.categoryName" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">新增目錄</el-button>
        </el-form-item>
</el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: {
	      categoryName : ""
      }
    }
  },

  created(){

  },

  methods: {

    onSubmit() {
      var vm = this;
      this.axios({
        method: 'POST',
        url: 'http://localhost:8085/category/add',
        data: vm.category
        }).then(function(resp){
          console.log(resp)
          vm.$message({
            message: '新增成功',
            type: 'success'
          });
          vm.$router.push("/category")
        }).catch((error) => { 
          console.error(error) 
            vm.$message({
            message: '新增失敗',
            type: 'error'
          });
        })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

