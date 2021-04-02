<template>
  <div class="app-container">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="使用者名稱">
          <el-input v-model="user.userName" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="user.password" />
        </el-form-item>
          <el-form-item label="電子信箱">
        <el-input v-model="user.email" />
        </el-form-item>
          <el-form-item label="電話">
        <el-input v-model="user.telPhone" />
        </el-form-item>
        <el-form-item label="備註">
          <el-input v-model="user.memo" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">新增使用者</el-button>
        </el-form-item>
</el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
	      userName : "",
	      password : "",
        email : "",
        telPhone : "",
        memo : ""
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
        url: 'http://localhost:8085/user/add',
        data: vm.user
        }).then(function(resp){
          console.log(resp)
          vm.$message({
            message: '新增成功',
            type: 'success'
          });
          vm.$router.push("/user")
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

