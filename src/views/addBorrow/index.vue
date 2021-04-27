<template>
  <div class="app-container">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="使用者名稱">
          <el-input v-model="borrow.username" />
        </el-form-item>
        <el-form-item label="書籍名稱">
          <el-input v-model="borrow.bookName" />
        </el-form-item>
        <el-form-item label="借閱日期">
          <el-calendar v-model="borrowDateValue"></el-calendar>
        </el-form-item>
        <el-form-item label="借閱期限">
          <el-calendar v-model="deadlineDateValue"></el-calendar>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">新增借閱</el-button>
        </el-form-item>
</el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      borrow: {
        bookName: "",
        username: "",
        borrowDate: "",
        borrowingDeadLine: ""
      },
      borrowDateValue: new Date(),
      deadlineDateValue: new Date() 
    }
  },

  created(){

  },

  methods: {
    onSubmit() {
      var vm = this;
      this.axios({
        method: 'POST',
        url: 'http://localhost:8085/borrow/add',
        data: vm.borrow
        }).then(function(resp){
          console.log(resp)
          vm.$message({
            message: '新增成功',
            type: 'success'
          });
          vm.$router.push("/borrow")
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

