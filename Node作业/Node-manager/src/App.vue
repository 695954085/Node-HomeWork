<template>
  <div id="app">
    <el-form :model='formLabel' label-width="110px" ref='form'>
      <el-form-item label='图片名称'>
        <el-input v-model='formLabel.imgName'></el-input>
      </el-form-item>
      <el-form-item label='上传的文件目录'>
        <el-select v-model='formLabel.fileDir' placeholder='请选择上传的文件目录或者新建一个文件夹' allow-create filterable @change='selectChange'>
          <el-option v-for='item in listData.data' :key='item' :label='item' :value='item'></el-option>
        </el-select>
      </el-form-item>
      <el-upload ref='upload' :limit='1'
      :on-exceed="handleExceed"
      :on-success='handleSuccess'
      :file-list="fileList"
      :auto-upload="false"
      class='upload-demo'
      action="/admin/upload"
      :data='formLabel'
      :headers="headers">
        <el-button size="small" type="primary">选择文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传一个文件</div>
      </el-upload>
      <el-form-item>
        <el-button type="primary" @click='onSubmit'>上传</el-button>
        <el-button type="danger" @click='onCancel'>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getListItems } from "@/api/getData";
export default {
  name: "App",
  data() {
    return {
      formLabel: {
        imgName: "",
        fileDir: ""
      },
      listData: [],
      fileList: [],
      headers: {
        'ContentType': 'multipart/form-data'
      }
    };
  },
  methods: {
    async initData() {
      try {
        this.listData = await getListItems({});
      } catch (e) {
        console.log(e);
      }
    },
    onSubmit() {
      //this.$refs["form"].submit();
      this.$refs['upload'].submit();
    },
    onCancel() {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(response, file, fileList){
      if(file.status == 'success'){
        this.$message('上传成功');
        this.initData();
        // this.$refs.upload.clearFiles();
      }
    },
    selectChange(option){
      console.log(`选中${option}`);
    }
  },
  mounted() {
    // 从服务器中获取列表数据
    this.initData();
  }
};
</script>

<style>
#app2 {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-form {
  width: 500px;
}

.el-select {
  width: 100%;
}

.upload-demo {
  margin-left: 110px;
  margin-bottom: 20px;
}
</style>
