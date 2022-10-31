<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加属性</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="属性模板" prop="templateId">
        <el-select v-model="value" placeholder="请选择">
          <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio v-model="radio" label="1">非销售属性</el-radio>
        <el-radio v-model="radio" label="2">销售属性</el-radio>
      </el-form-item>
      <el-form-item label="输入类型" prop="inputType">
        <el-radio v-model="radio1" label="1">手动录入</el-radio>
        <el-radio v-model="radio1" label="2">单选</el-radio>
        <el-radio v-model="radio1" label="3">多选</el-radio>
        <el-radio v-model="radio1" label="4">单选(下拉列表)</el-radio>
        <el-radio v-model="radio1" label="5">多选(下拉列表)</el-radio>
      </el-form-item>
      <el-form-item label="备选值列表" prop="valueList">
        <el-input v-model="ruleForm.valueList"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="unit">
        <el-input v-model="ruleForm.unit"></el-input>
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
export default {
  data() {
    return {
      cities: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Nanjing',
        label: '南京'
      }, {
        value: 'Chengdu',
        label: '成都'
      }, {
        value: 'Shenzhen',
        label: '深圳'
      }, {
        value: 'Guangzhou',
        label: '广州'
      }],
      radio: '1',
      radio1: '1',
      value: '',
      ruleForm: {
        name: '',
        description: '',
        valueList: '',
        unit: '',
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
