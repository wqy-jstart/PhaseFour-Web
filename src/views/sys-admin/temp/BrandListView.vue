<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>品牌列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="品牌名称" width="180" align="center"></el-table-column>
      <el-table-column prop="pinyin" label="品牌拼音" width="80"></el-table-column>
      <el-table-column prop="logo" label="品牌Logo" width="100" align="center"></el-table-column>
      <el-table-column prop="description" label="品牌描述" header-align="center"></el-table-column>
      <el-table-column prop="keywords" label="品牌关键字" width="100" align="center"></el-table-column>
      <el-table-column prop="sort" label="品牌排序" width="100" align="center"></el-table-column>
      <el-table-column prop="sales" label="品牌价格" width="80" align="center"></el-table-column>
      <el-table-column prop="productCount" label="商品产量" width="80" align="center"></el-table-column>
      <el-table-column prop="commentCount" label="评论数量" width="80" align="center"></el-table-column>
      <el-table-column prop="positiveCommentCount" label="好评数量" width="80" align="center"></el-table-column>
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
    changeEnable(brand) {
      console.log('brand id=' + brand.id);
      //点击后获取的enable值
      console.log('brand enable=' + brand.enable);
      let enableText = ['禁用', '启用'];
      let url = 'http://localhost:9080/brands/' + brand.id;
      if (brand.enable == 1) { // 如果点击后enable为1,说明是启用操作,则请求路径应为处理启用的路径
        console.log("启用品牌")
        url += '/enable';
      } else {
        console.log("禁用品牌")
        url += '/disable';
      }
      console.log('url=' + url)
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          let message = '将品牌[' + brand.username + ']的启用状态改为[' + enableText[brand.enable] + ']成功!';
          this.$message({
            message: message,
            type: 'success'
          });
        } else { // 否则输出错误信息
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 40400) { // 数据不存在的时候才刷新
          this.loadAlbumList();
        }
      })
    },
    handleEdit(brand) {
      let message = '您正在尝试编辑【' + brand.id + '-' + brand.name + '】的相册详情，抱歉，该功能尚未实现……';
      this.$alert(message, '提示', {
        confirmButtonText: '确定'
      });
    },
    handleDelete(brand) {
      let url = 'http://localhost:9080/brands/' + brand.id + '/delete';
      console.log('url=' + url);
      this.axios.post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        if (responseBody.state == 20000 || responseBody.state == 40400) {
          this.loadBrandList();
        }
      });
    },
    openDeleteConfirm(brand) {
      let message = '此操作将永久删除[' + brand.name + ']相册, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(brand);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 该方法用来请求相册的列表数据
    loadBrandList() {
      console.log('loadBrandList');
      let url = "http://localhost:9080/brands" // 请求路径
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
    this.loadBrandList();
  }
}
</script>