<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%">
         <!-- prop必须是服务器绑定的属性名 -->
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" width="120" align="center"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="120" align="center"></el-table-column>
      <el-table-column label="头像url">
        <template slot-scope="scope">
        <img :src="scope.row.avatar" width="120" height="120" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="120" align="center"></el-table-column>
      <el-table-column prop="email" label="电子邮箱" width="180" align="center"></el-table-column>
      <el-table-column prop="description" label="管理员简介" header-align="center"></el-table-column>
      <el-table-column label="是否启用" width="80" align="center" @click="updateEnableById()">
        <template slot-scope="scope">
          <!-- 1开 0关 -->
          <el-switch
              v-model="scope.row.enable"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#aaaaaa">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="lastLoginIp" label="最后一次登录地址" width="80" align="center"></el-table-column>
      <el-table-column prop="loginCount" label="累计登录次数" width="80" align="center"></el-table-column>
      <el-table-column prop="gmtLastLogin" label="最后一次登录时间" width="80" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini"
                     :disabled="scope.row.id == 1"
                     @click="handleEdit(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini"
                     :disabled="scope.row.id == 1"
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
    updateEnableById(){

    },
    handleEdit(admin) {
      let message = '您正在尝试编辑【' + admin.id + '-' + admin.username + '】的相册详情，抱歉，该功能尚未实现……';
      this.$alert(message, '提示', {
        confirmButtonText: '确定'
      });
    },
    handleDelete(admin) {
      let url = 'http://localhost:9081/admins/' + admin.id + '/delete';
      console.log('url=' + url);
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 20000 || responseBody.state == 40400) {
          this.loadAdminList();
        }
      });
    },
    openDeleteConfirm(admin) {
      let message = '此操作将永久删除[' + admin.username + ']管理员, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(admin);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 该方法用来请求相册的列表数据
    loadAdminList() {
      console.log('loadAdminList');
      let url = "http://localhost:9081/admins" // 请求路径
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
    this.loadAdminList();
  }
}
</script>