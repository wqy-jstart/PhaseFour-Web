<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加属性模板</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="拼音" prop="pinyin">
        <el-input v-model="ruleForm.pinyin"></el-input>
      </el-form-item>
      <el-form-item label="关键词列表" prop="keywords">
        <el-input v-model="ruleForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>
<script>
import global from '../../../components/Global';
export default {
  data() {
    return {
      productUrl: global.productUrl,
      value: true,
      ruleForm: {
        name: '',
        pinyin: '',
        logo: '',
        description: '',
        keywords: '',
        sort: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入属性模板名称', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
        ],
        pinyin: [
          {required: true, message: '请输入属性模板拼音', trigger: 'blur'},
          {min: 4, max: 35, message: '长度在 4 到 35 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      // 对表单进行检查
      this.$refs[formName].validate((valid) => {
        if (valid) { // 满足条件则通过验证

        } else { // 否则表单格式有误,不会通过
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) { // 该方法用来重置表单中的信息
      this.$refs[formName].resetFields();
    }
  }
}
</script>