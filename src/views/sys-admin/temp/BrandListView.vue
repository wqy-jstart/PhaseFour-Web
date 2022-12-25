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
      <el-table-column prop="productCount" label="品牌产量" width="80" align="center"></el-table-column>
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

    <!-- 弹出的编辑相册的对话框 -->
    <el-dialog title="修改相册" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm">
        <el-form-item label="品牌名称" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌拼音" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.pinyin" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.logo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌描述" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌关键字" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.keywords" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌排序" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌价格" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.sales" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import global from '../../../components/Global';
export default {
  data() {
    return {
      productUrl: global.productUrl,
      tableData: [],
      dialogFormVisible: false,
      ruleForm:{

      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    // 处理提交修改
    submitEdit() {
      let url = this.productUrl+'brands/' + this.ruleForm.id + '/update';
      console.log('url:' + url);
      let formData = this.qs.stringify(this.ruleForm);// 将修改的数据转换为formData格式
      console.log('formData=' + formData);

      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post(url, formData).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.$message({
            type: 'success',
            message: '修改品牌成功!'
          });
          this.dialogFormVisible = false;
          this.loadBrandList();
        } else if (responseBody.state == 40900) {
          this.$message.error(responseBody.message);
        } else {
          this.$message.error(responseBody.message);
          this.dialogFormVisible = false;
          this.loadBrandList();
        }
      })
    },
    // 处理修改前的数据
    handleEdit(brand) {
      let message = '您正在尝试编辑【' + brand.id + '-' + brand.name + '】的相册详情……';
      console.log(message);
      this.dialogFormVisible = true;
      // this.ruleForm = album;
      let url = this.productUrl+'brands/' + brand.id + '/select';
      console.log(url);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.ruleForm = responseBody.data;
          this.dialogFormVisible = true;
        } else {
          this.$message.error(responseBody.message);
          this.loadbrandList();
        }
      })
    },
    changeEnable(brand) {
      console.log('brand id=' + brand.id);
      //点击后获取的enable值
      console.log('brand enable=' + brand.enable);
      let enableText = ['禁用', '启用'];
      let url = this.productUrl+'brands/' + brand.id;
      if (brand.enable == 1) { // 如果点击后enable为1,说明是启用操作,则请求路径应为处理启用的路径
        console.log("启用品牌")
        url += '/enable';
      } else {
        console.log("禁用品牌")
        url += '/disable';
      }
      console.log('url=' + url)
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwt')
            }
          }).post(url).then((response) => {
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
          this.loadBrandList();
        }
      })
    },
    handleDelete(brand) {
      let url = this.productUrl+'brands/' + brand.id + '/delete';
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
          this.$message.success("删除成功！")
          this.loadBrandList();
        }
      });
    },
    openDeleteConfirm(brand) {
      let message = '此操作将永久删除[' + brand.name + ']品牌, 是否继续?'
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
      let url = this.productUrl+"brands" // 请求路径
      console.log('url=' + url);
      this.axios
          .create({
            'headers':{
              'Authorization':localStorage.getItem('jwt')
            }
          }).get(url).then((response) => {// 发送异步请求
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