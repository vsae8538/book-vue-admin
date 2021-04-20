<template>
  <div class="app-container">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="目錄名稱">
          <el-input v-model="category.categoryName" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
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
        id: -1,
	      categoryName : "(Empty)",
      },
      msg : ''
    }
  },

  created(){
    this.fetchDataById();
  },

  methods: {
    fetchDataById(){
        var id = this.$route.params.id;
        var vm = this;
        this.axios({
          method: 'GET',
          url: 'http://localhost:8085/category/query/'+id
          }).then(function(resp){
            console.log(resp)
            vm.category = resp.data.data;
          })
    },
    onSubmit() {
      var vm = this;
      var msg = vm.msg;
      this.axios({
        method: 'POST',
        url: 'http://localhost:8085/category/edit',
        data: vm.category
        }).then(function(resp){
          console.log(resp)
          msg = resp.data.data.message;
          vm.$message({
            message: '修改成功',
            type: 'success'
          });
          vm.$router.push("/category")
        }).catch((error) => { 
          console.error(error) 
          msg = error;
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

