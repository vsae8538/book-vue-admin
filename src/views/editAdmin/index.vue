<template>
   <div class="app-container">
      <el-form ref="form" :model="admin" label-width="120px">
        <el-form-item label="管理員名稱">
          <el-input v-model="admin.username" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="admin.password" />
        </el-form-item>
        <el-form-item label="電子信箱">
          <el-input v-model="admin.email" />
        </el-form-item>
        <el-form-item label="電話">
          <el-input v-model="admin.telPhone" />
        </el-form-item>
        <el-form-item label="頭像">
          <el-image
            style="width: 300px; height: 300px"
            :src="admin.avatar"
          ></el-image>
          <div>
            <el-button type="text" @click="dialogVisible = true">重新上傳</el-button>
            <el-dialog
              title="重新上傳圖片"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              <el-upload
                list-type="picture-card"
                ref="upload"
                action="http://localhost:8085/upload/image"
                :on-change="handleFileChange"
                :on-remove="handleFileRemove"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload="beforeUploadFile"
                :multiple="false"
                :file-list="fileList"
                :auto-upload="false"
                accept=".jpg, .jpeg, .png, .gif"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过20M
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">確認上傳</el-button>
                  <span slot="footer" class="dialog-footer">
                </span>
                </div>
              </el-upload>
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item>
          <span></br></span>  
            <el-button type="primary" @click="onSubmit">修改資料</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin: {
        username: "",
        password: "",
        email: "",
        telPhone: "",
        avatar: ""
      },
      fileList : [],
      msg : '',
      dialogVisible: false
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
          url: 'http://localhost:8085/system/query/'+id
          }).then(function(resp){
            console.log(resp)
            vm.admin = resp.data.data;
          })

    },
    handleClose(done) {
      this.$confirm('確認關閉?')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit() {
      var vm = this;
      if(vm.admin.avatar == '') {
        this.$message({
          message: '請選擇要上傳的頭像',
          type: 'error'
        })
        return false
      }
      this.axios({
        method: 'POST',
        url: 'http://localhost:8085/system/edit',
        data: vm.admin
        }).then(function(resp){
          console.log(resp)
          vm.$message({
            message: '修改成功',
            type: 'success'
          });
          vm.$router.push("/admin")
        }).catch((error) => { 
          console.error(error) 
            vm.$message({
            message: '修改失敗',
            type: 'error'
          });
        })
    },
    handleFileChange(file, fileList) {
      console.log('文件改變')
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
    },
    handleFileRemove(file, fileList) {
      console.log('文件移除')
    },
    uploadSuccess(response, file, fileList) {
      var vm = this;
      console.log('上傳成功')
      console.log(response)
      if (response.message == 'success') {
        vm.admin.avatar = response.data;
        this.$message({
          message: '文件上傳成功',
          type: 'success'
        })
        console.log(vm.admin.avatar);
        vm.dialogVisible = false;
      }
    },
    uploadError(err, file, fileList) {
      this.$message.error('文件上傳失敗：' + err.toString())
    },
    beforeUploadFile(file) {
      const temp = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (temp !== 'jpeg' && temp !== 'jpg' && temp !== 'png' && temp !== 'gif') {
        this.$message({
          message: '當前文件格式不符合要求',
          type: 'error'
        })
        return false
      }
      if (!file) {
        this.$message({
          message: '請選擇要上傳的文件',
          type: 'error'
        })
        return false
      }
      if (file.size / 1024 / 1024 > 20) {
        this.$message({
          message: '文件大小不能超過20M',
          type: 'error'
        })
        return false
      }
    },

    submitUpload() {
      this.$refs.upload.submit()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

