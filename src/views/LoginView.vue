<style>/*scoped是作用域问题,当前生效*/
body{
  background: #0a366a;
}
</style>

<template>
<div>
  <div style="width: 600px; background: white; margin: 60px auto; padding: 30px">
  <h1 style="text-align: center; margin: 30px auto">管理员登录</h1>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {// 初始化ruleForm对象
        username: '',
        password: ''
      },
      rules: { // 制定规则
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    // 处理登录事件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9081/admins/login';
          console.log("url="+url);
          let formData = this.qs.stringify(this.ruleForm);
          console.log('formData = '+formData);
          this.axios.post(url,formData).then((response)=>{
            let responseBody = response.data;
            if (responseBody.state == 20000){
              this.$message({
                message: '登录成功!',
                type:'success' // 提示信息
              });
              let jwt = responseBody.data;
              console.log('登陆成功,服务器响应JWT:'+jwt);
              localStorage.setItem('jwt',jwt);
              console.log('已经将JWT保存到localStorage中')
            }else {
              console.log(responseBody.message);
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
  }
}
</script>