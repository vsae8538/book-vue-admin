<template>
  <div class="app-container">
      <el-form ref="form" :model="user" label-width="120px">
        <el-form-item label="使用者名稱">
          <el-input v-model="user.userName" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="user.password"  />
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
            <el-button type="primary" @click="onSubmit">修改</el-button>
        </el-form-item>
</el-form-item>
      </el-form>
  </div>
</template>

<script>

import { queryUser, editUser } from '@/api/user'

export default {
  data() {
    return {
      user: {
        id: -1,
	      userName : "Empty",
	      password : "Empty",
        email : "Empty",
        telPhone : "Empty",
        memo : "Empty"
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
      
      queryUser(id).then(response => {
          console.log(response)
          vm.user = response.data;
          vm.user.password = '********';
      })
    },
    onSubmit() {
      var vm = this;
      var msg = vm.msg;

      editUser(vm.user).then(response =>{
        console.log(response)
        msg = response.data.message;
        vm.$message({
          message: '修改成功',
          type: 'success'
        });
        vm.$router.push("/user")
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

