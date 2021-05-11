<template>
  <div class="app-container">
      <el-form ref="form" :model="borrow" label-width="120px">
        <el-form-item label="使用者名稱">
          <el-input v-model="borrow.username" />
        </el-form-item>
        <el-form-item label="書籍名稱">
          <el-input v-model="borrow.bookName" />
        </el-form-item>
        <el-form-item label="借閱日期">
          <el-calendar v-model="borrow.borrowDate"></el-calendar>
        </el-form-item>
        <el-form-item label="借閱期限">
          <el-calendar v-model="borrow.borrowingDeadLine"></el-calendar>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">新增借閱</el-button>
        </el-form-item>
</el-form-item>
      </el-form>
  </div>
</template>

<script>
import { addBorrowing } from '@/api/borrow'

export default {
  data() {
    return {
      borrow: {
        bookName: "",
        username: "",
        borrowDate: new Date(),
        borrowingDeadLine: new Date()
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

      addBorrowing(vm.borrow).then(response =>{
        console.log(response)
        vm.$message({
          message: '新增成功',
          type: 'success'
        });
        vm.$router.push("/bookMange/borrow")
      }).catch((error) => { 
          console.log(error.response);
          vm.$message({
          message: '新增失敗 原因:' + error.response.message,
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

