<template>
  <div class="app-container">
      <el-form ref="form" :model="category" label-width="120px">
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

import { editCategory, queryCategory } from '@/api/category'

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

        queryCategory(id).then(response => {
            console.log(response)
            vm.category = response.data;
        })
    },
    onSubmit() {
      var vm = this;
      var msg = vm.msg;

      editCategory(vm.category).then(response => {
        console.log(response)
          msg = response.data.message;
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

