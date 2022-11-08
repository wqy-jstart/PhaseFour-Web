<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="ruleForm.avatar"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enable">
        <el-switch
            v-model="ruleForm.enable"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#aaaaaa">
        </el-switch>
      </el-form-item>
      <el-form-item label="角色" prop="roleIds">
        <!-- 将选择的多个角色名称对应的多个id与数组进行绑定-->
        <el-select v-model="ruleForm.roleIds" multiple placeholder="请选择">
          <el-option
              v-for="item in roleListOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleListOptions: [],
      ruleForm: {
        roleIds: [],// 绑定多选角色的多个id
        username: '武清源',
        password: '123456',
        nickname: 'Devotion',
        description: 'nothing',
        phone: '15551898017',
        email: '2168149199@qq.com',
        avatar: 'https://img2.baidu.com/it/u=4244269751,4000533845&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        enable: 0,
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入电子邮箱', trigger: 'blur'},
          {min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入简介', trigger: 'blur'},
          {min: 4, max: 35, message: '长度在 4 到 35 个字符', trigger: 'blur'}
        ],
        //"blur"丢失焦点事件
        roleIds: [
          {required: true, message: '请至少输入一个角色', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    // 获取角色列表
    loadRoleList() {
      console.log('loadRoleList');
      let url = "http://localhost:9081/roles" // 请求路径
      console.log('url=' + url);
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwt')
            }
          })
          .get(url).then((response) => {// 发送异步请求
        let responseBody = response.data;
        this.roleListOptions = responseBody.data;//将获取响应的数据中的data数据赋值给tableData
      })
    },
    // 添加管理员事件
    submitForm(formName) {
      // 对表单进行检查
      this.$refs[formName].validate((valid) => {
        if (valid) { // 满足条件则通过验证
          let url = 'http://localhost:9081/admins/add-new'
          console.log('url = ' + url);
          //将formData对象转换成FormData格式,当后端不添加@RequestBody注解时接收    {indices、brackets、repeat}数组格式
          let formData = this.qs.stringify(this.ruleForm,{arrayFormat:'repeat'});
          console.log('formData=' + formData);
          this.axios
              .create({
                'headers':{
                  'Authorization':localStorage.getItem('jwt')
                }
              })
              .post(url, formData).then((response) => {//箭头函数
            let responseBody = response.data;
            console.log('responseBody = ');
            console.log(responseBody);
            if (responseBody.state == 20000) {
              this.$message({
                message: '添加管理员成功！',
                type: 'success'
              });
              this.resetForm(formName);// 调用该函数重置表单中的信息
            } else {
              this.$message.error(responseBody.message);
            }
          });
        } else { // 否则表单格式有误,不会通过
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) { // 该方法用来重置表单中的信息
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.loadRoleList();
  }
}
</script>
