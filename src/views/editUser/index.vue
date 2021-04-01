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
      user: {
        id: -1,
	      userName : "(Empty)",
	      password : "(Empty)",
        email : "(Empty)",
        telPhone : "(Empty)",
        memo : "(Empty)"
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
          url: 'http://localhost:8085/user/query/'+id
          }).then(function(resp){
            console.log(resp)
            vm.user = resp.data.data;
          })
    },
    onSubmit() {
      var vm = this;
      var msg = vm.msg;
      this.axios({
        method: 'POST',
        url: 'http://localhost:8085/user/edit',
        data: vm.user
        }).then(function(resp){
          console.log(resp)
          msg = resp.data.data.message;
        }).catch((error) => { 
          console.error(error) 
          msg = error;
        })
        
      console.log(msg) 
      //this.$message(msg)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

