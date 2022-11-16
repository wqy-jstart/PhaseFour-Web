<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增SPU</el-breadcrumb-item>
      <el-breadcrumb-item>第3步：选择商品图片</el-breadcrumb-item>
    </el-breadcrumb>


    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品相册" prop="albumId">
        <el-select v-model="ruleForm.albumId" placeholder="请选择">
          <el-option
              v-for="item in albumListOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
        <div>暂时略过：显示相册中的图片、向相册中上传图片……</div>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="backToPreStep()">上一步</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      albumListOptions: [],
      ruleForm: {
        albumId: '',
        albumName:''
      },
      rules: {
        albumId: [
          {required: true, message: '请选择商品相册', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    backToPreStep() {
      this.$router.push('spu-add-new2');
    },
    // 加载本地ruleForm数据
    loadLocalRuleForm() {
      let localRuleFormString = localStorage.getItem('ruleForm');
      if (localRuleFormString) {
        let localRuleForm = JSON.parse(localRuleFormString);
        this.ruleForm = localRuleForm;
      }
    },
    loadAlbumList() {
      console.log('准备从服务器端加载【相册列表】……');
      let url = 'http://localhost:9080/albums';
      console.log('请求路径：' + url);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(url)
          .then((response) => {
            let responseBody = response.data;
            console.log('接收到服务器端响应的结果：');
            console.log(responseBody);
            this.albumListOptions = responseBody.data;
          });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9080/albums/'+this.ruleForm.albumId+'/select';
          console.log('url='+url);
          this.axios
              .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
              .get(url).then((response) => {
            let responseBody = response.data;
            if (responseBody.state == 20000) {
              this.ruleForm.albumName = responseBody.data.name;
              let ruleFormString = JSON.stringify(this.ruleForm);
              console.log('ruleFormString >>> ' + ruleFormString);
              localStorage.setItem('ruleForm', ruleFormString);
              this.$router.push('spu-add-new4');
            } else {
              this.$message.error(responseBody.message);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.loadAlbumList();
    this.loadLocalRuleForm();
  }
}
</script>

<style scoped>

</style>