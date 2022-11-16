<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>属性列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>


    <el-form :model="ruleForm" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="请选择属性模板">
        <el-select v-model="ruleForm.templateId" placeholder="请选择" @change="loadAttributeList()">
          <el-option
              v-for="item in attributeTemplateListOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="templateId" label="所属属性模板id" width="120" align="center"></el-table-column>
      <el-table-column prop="name" label="属性名称" width="180" align="center"></el-table-column>
      <el-table-column prop="description" label="属性简介" header-align="center"></el-table-column>
      <el-table-column prop="type" label="属性类型" header-align="center"></el-table-column>
      <el-table-column prop="inputType" label="输入类型" header-align="center"></el-table-column>
      <el-table-column prop="valueList" label="备选值列表" header-align="center"></el-table-column>
      <el-table-column prop="unit" label="计量单位" header-align="center"></el-table-column>
      <el-table-column prop="sort" label="排序序号" width="80" align="center"></el-table-column>
      <el-table-column prop="isAllowCustomize" label="是否允许自定义" width="120" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini"
                     @click="handleEdit(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini"
                     @click="openDeleteConfirm(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      attributeTemplateListOptions:[],
      tableData: [],
      ruleForm:{
        templateId:'',
      },
    }
  },
  methods: {

    // 根据属性模板的id查询属性列表
    loadAttributeList(){
      let url = 'http://localhost:9080/attributes/'+this.ruleForm.templateId+'/list';
      this.axios.create({
        'headers':{
          'Authorization':localStorage.getItem('jwt')
        }
      }).get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.tableData = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    handleEdit(attribute) {
      let message = '您正在尝试编辑【' + attribute.id + '-' + attribute.name + '】的属性详情，抱歉，该功能尚未实现……';
      this.$alert(message, '提示', {
        confirmButtonText: '确定'
      });
    },
    handleDelete(attribute) {
      let url = 'http://localhost:9080/attributes/' + attribute.id + '/delete';
      console.log('url=' + url);
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwt')
            }
          }).post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 20000 || responseBody.state == 40400) {
          this.loadAttributeTemplateList();
        }
      });
    },
    openDeleteConfirm(attribute) {
      let message = '此操作将永久删除[' + attribute.name + ']属性, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(attribute);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    loadAttributeTemplateList() {
      let url = 'http://localhost:9080/AttributeTemplates';
      this.axios.create({
        'headers': {
          'Authorization': localStorage.getItem('jwt')
        }
      }).get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          let attributeTemplateList = responseBody.data;
          this.attributeTemplateListOptions = attributeTemplateList;
        } else {
          this.$message.error(responseBody.message);
        }
      });
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    this.loadAttributeTemplateList();
  }
}
</script>