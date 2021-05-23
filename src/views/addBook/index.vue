<template>
  <div class="app-container">
      <el-form ref="form" :model="book" label-width="120px">
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
        <el-form-item label="書籍圖片">
          <el-upload
            list-type="picture-card"
            ref="upload"
            action="http://localhost:8085/upload/image"
            :headers = "headers"
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
          </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <span></br></span>  
            <el-button type="primary" @click="onSubmit">新增書籍</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
import { getToken } from '@/utils/auth'
import { addBook } from '@/api/book'

export default {
  data() {
    return {
      headers: {
        Authorization: getToken()
      },
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
      isPublishValue: 0
    }
  },

  created(){
    this.getCategorySelectList();
  },

  methods: {
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
        vm.book.imageUrl = response.data;
        this.$message({
          message: '文件上傳成功',
          type: 'success'
        })
        console.log(vm.book.imageUrl);
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

      addBook(vm.book).then(response => {
          console.log(response)
          vm.$message({
            message: '新增成功',
            type: 'success'
          });
          vm.$router.push("/book")
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

