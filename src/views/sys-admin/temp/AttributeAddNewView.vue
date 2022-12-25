<style>
.right {
  float: right;
  width: 30px;
}
</style>
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加属性</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="属性模板" prop="templateId">
        <el-select v-model="ruleForm.templateId" placeholder="请选择">
          <el-option
              v-for="item in attributeTemplateListOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
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
        <template>
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="0">非销售属性
              <el-tooltip class="item" effect="dark" content="对商品销售不产生影响，但应补充说明的属性，例如：手机的产地" placement="top">
                <i class="el-icon-info" style="color: #aaa"></i>
              </el-tooltip>
            </el-radio>
            <el-radio :label="1">销售属性<el-tooltip class="item" effect="dark" content="必须确定属性的值才可以进行商品销售的属性，例如：手机的内存容量" placement="top">
              <i class="el-icon-info" style="color: #aaa"></i>
            </el-tooltip></el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item label="输入类型" prop="inputType">
        <template>
          <el-radio-group v-model="ruleForm.inputType">
            <el-radio :label="0">手动录入</el-radio>
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">单选（下拉列表）</el-radio>
            <el-radio :label="4">多选（下拉列表）</el-radio>
          </el-radio-group>
        </template>
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
import global from '../../../components/Global';
export default {
  data() {
    return {
      productUrl: global.productUrl,
      attributeTemplateListOptions: [],
      radio: '1',
      radio1: '1',
      ruleForm: {
        templateId: '',
        name: '',
        description: '',
        type: 0,
        inputType: 0,
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
    loadAttributeTemplateList() {
      let url = this.productUrl+'AttributeTemplates';
      console.log('url='+url);
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwt')
            }
          }).get(url).then((response)=>{
        let responseBody = response.data;
        this.attributeTemplateListOptions = responseBody.data;
      })
    }, 
    submitForm(formName) {
      // 对表单进行检查
      this.$refs[formName].validate((valid) => {
        if (valid) { // 满足条件则通过验证
          let url = this.productUrl+'attributes/add-New'
          console.log('url = ' + url);
          let formData = this.qs.stringify(this.ruleForm);//将formData对象转换成FormData格式,当后端不添加@RequestBody注解时接收
          console.log('formData=' + formData);
          this.axios
              .create({
                'headers':{
                  'Authorization':localStorage.getItem('jwt')
                }
              }).post(url, formData).then((response)=>{//箭头函数
            let responseBody = response.data;
            console.log('responseBody = ');
            console.log(responseBody);
            if (responseBody.state == 20000){
              this.$message({
                message: '添加属性成功！',
                type: 'success'
              });
              this.resetForm(formName);// 调用该函数重置表单中的信息
            }else {
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
    this.loadAttributeTemplateList();
  }
}
</script>
