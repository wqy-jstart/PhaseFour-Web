<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加类别</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="父类级别" prop="parentId">
        <el-input placeholder="请输入父级类别的id,一级类别请填0" v-model="ruleForm.parentId"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="关键词列表" prop="keywords">
        <el-input v-model="ruleForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="ruleForm.icon"></el-input>
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enable">
        <el-switch
            v-model="value1"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否显示在导航栏" prop="isDisplay">
        <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
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
      value1: true,
      value2: true,
      ruleForm: {
       parentId:'',
        name:'',
        keywords:'',
        icon:'',
        sort:'0'
      },
      rules: {
        parentId: [
          {required: true, message: '请输入父类级别的id,一级类别请填0', trigger: 'blur'},
          {min: 4, max: 35, message: '长度在 4 到 35 个字符', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入品牌名称', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
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