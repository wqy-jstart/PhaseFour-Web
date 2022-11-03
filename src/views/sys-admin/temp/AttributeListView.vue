<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>属性列表</el-breadcrumb-item>
    </el-breadcrumb>

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
      tableData: []
    }
  },
  methods: {
    handleEdit(attribute) {
      let message = '您正在尝试编辑【' + attribute.id + '-' + attribute.name + '】的相册详情，抱歉，该功能尚未实现……';
      this.$alert(message, '提示', {
        confirmButtonText: '确定'
      });
    },
    handleDelete(attribute) {
      let url = 'http://localhost:9080/attributes/' + attribute.id + '/delete';
      console.log('url=' + url);
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 20000 || responseBody.state == 40400) {
          this.loadAlbumList();
        }
      });
    },
    openDeleteConfirm(attribute) {
      let message = '此操作将永久删除[' + attribute.name + ']相册, 是否继续?'
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
    // 该方法用来请求相册的列表数据
    loadAlbumList() {
      console.log('loadAttributeList');
      let url = "http://localhost:9080/attributes" // 请求路径
      console.log('url=' + url);
      this.axios.get(url).then((response) => {// 发送异步请求
        let responseBody = response.data;
        this.tableData = responseBody.data;//将获取响应的数据中的data数据赋值给tableData
      })
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    console.log('mounted');
    this.loadAlbumList();
  }
}
</script>