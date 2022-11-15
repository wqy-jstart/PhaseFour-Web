<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/sys-admin' }">
        <i class="el-icon-s-promotion"></i> 后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>类别列表</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in history"><span v-text="item.name"></span></el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%">
      <!-- prop必须是服务器绑定的属性名 -->
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="120" align="center"></el-table-column>
      <el-table-column prop="parentId" label="父级类别id" width="120" align="center"></el-table-column>
      <el-table-column prop="depth" label="深度" width="120" align="center"></el-table-column>
      <el-table-column prop="keywords" label="关键字" width="120" align="center"></el-table-column>
      <el-table-column prop="sort" label="排序" width="120" align="center"></el-table-column>
      <el-table-column prop="icon" label="图标" width="120" align="center"></el-table-column>
      <el-table-column label="是否启用" width="80" align="center">
        <template slot-scope="scope">
          <!-- 1开 0关 -->
          <el-switch
              @change="changeEnable(scope.row)"
              v-model="scope.row.enable"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#aaaaaa">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="isParent" label="是否为父级" width="120" align="center"></el-table-column>
      <el-table-column label="是否显示导航栏" width="80" align="center">
        <template slot-scope="scope">
          <!-- 1开 0关 -->
          <el-switch
              @change="changeDisplay(scope.row)"
              v-model="scope.row.isDisplay"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#aaaaaa">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="查看子级" width="100" align="center">
        <template slot-scope="scope">
          <el-button size="mini" :disabled="scope.row.isParent == 0 "
                     @click="showSubCategories(scope.row)">查看子级
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini"
                     @click="handleEdit(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini"
                     :disabled="scope.row.isParent == 1"
                     @click="openDeleteConfirm(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin-top: 10px;float: right;"
               v-if ="currentDepth != 1"
               @click="goBack()">返回
    </el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      history: [],
      currentDepth: 1,
      currentParentId: 0,
      displayText: ['不显示在导航栏', '显示在导航栏'],
      enableText: ['禁用', '启用'],
      tableData: []
    }
  },
  methods: {
    goBack() {
      let parentCategory = this.history[--this.currentDepth - 1];
      this.currentParentId = parentCategory.parentId;
      this.history.pop();
      this.loadCategoryList();
    },
    showSubCategories(category) {
      this.history[this.currentDepth - 1] = category;
      this.currentDepth++;
      this.currentParentId = category.id;
      this.loadCategoryList()
    },
    changeDisplay(category) {
      console.log('category id=' + category.id);
      //点击后获取的enable值
      console.log('category isDisplay=' + category.isDisplay);
      let url = 'http://localhost:9080/categories/' + category.id;
      if (category.isDisplay == 1) { // 如果点击后enable为1,说明是启用操作,则请求路径应为处理启用的路径
        console.log("显示类别")
        url += '/display';
      } else {
        console.log("隐藏类别")
        url += '/hidden';
      }
      console.log('url=' + url)
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwt')
            }
          })
          .post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          let message = '将类别[' + category.username + ']的显示状态改为[' + this.displayText[category.isDisplay] + ']成功!';
          this.$message({
            message: message,
            type: 'success'
          });
        } else { // 否则输出错误信息
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 40400) { // 数据不存在的时候才刷新
          this.loadCategoryList();
        }
      })
    },
    changeEnable(category) {
      console.log('category id=' + category.id);
      //点击后获取的enable值
      console.log('category enable=' + category.enable);
      let url = 'http://localhost:9080/categories/' + category.id;
      if (category.enable == 1) { // 如果点击后enable为1,说明是启用操作,则请求路径应为处理启用的路径
        console.log("启用类别")
        url += '/enable';
      } else {
        console.log("禁用类别")
        url += '/disable';
      }
      console.log('url=' + url)
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwt')
            }
          })
          .post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          let message = '将类别[' + category.username + ']的启用状态改为[' + this.enableText[category.enable] + ']成功!';
          this.$message({
            message: message,
            type: 'success'
          });
        } else { // 否则输出错误信息
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 40400) { // 数据不存在的时候才刷新
          this.loadCategoryList();
        }
      })
    },
    handleEdit(category) {
      let message = '您正在尝试编辑【' + category.id + '-' + category.username + '】的相册详情，抱歉，该功能尚未实现……';
      this.$alert(message, '提示', {
        confirmButtonText: '确定'
      });
    },
    handleDelete(category) {
      let url = 'http://localhost:9080/categories/' + category.id + '/delete';
      console.log('url=' + url);
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwt')
            }
          })
          .post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 20000 || responseBody.state == 40400) {
          this.loadCategoryList();
        }
      });
    },
    openDeleteConfirm(category) {
      let message = '此操作将永久删除[' + category.username + ']类别, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(category);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 该方法用来请求相册的列表数据
    loadCategoryList() {
      console.log('loadCategoryList');
      let url = "http://localhost:9080/categories/list-by-parent?parentId=" + this.currentParentId // 请求路径
      console.log('url=' + url);
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwt')
            }
          })
          .get(url).then((response) => {// 发送异步请求
        if (responseBody.state == 20000) {
          this.tableData = responseBody.data;//将获取响应的数据中的data数据赋值给tableData
        } else {
          this.$message.error(responseBody.message);
        }
      })
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    console.log('mounted');
    this.loadCategoryList();
  }
}
</script>