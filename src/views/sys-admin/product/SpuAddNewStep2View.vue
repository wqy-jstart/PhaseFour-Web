<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增SPU</el-breadcrumb-item>
      <el-breadcrumb-item>第2步：填写基本信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="品牌" prop="brandId">
        <el-select v-model="ruleForm.brandId" placeholder="请选择">
          <el-option
              v-for="item in brandListOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="货号" prop="typeNumber">
        <el-input v-model="ruleForm.typeNumber"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="计件单位" prop="unit">
            <el-input v-model="ruleForm.unit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="售价" prop="listPrice">
            <el-input v-model="ruleForm.listPrice"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="库存" prop="stock">
            <el-input v-model="ruleForm.stock"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="库存阈警值" prop="stockThreshold">
            <el-input v-model="ruleForm.stockThreshold"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="关键词" prop="keywords">
        <el-input v-model="ruleForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-input v-model="ruleForm.tags"></el-input>
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="backToPreStep()">上一步</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brandListOptions: [],
      ruleForm: {
        categoryId: '',
        categoryName: '',
        brandId: null,
        brandName: '',
        name: 'Redmi Note 11 5G',
        title: 'Redmi Note 11 5G 天玑810 33W Pro快充 5000mAh大电池 6GB +128GB 浅梦星河',
        description: '【品质好物】天玑810，5000mAh大电池【Note11SE火热抢购中】',
        typeNumber: '100028235472',
        unit: '部',
        listPrice: '1199',
        stock: '5000',
        stockThreshold: '500',
        keywords: '小米,红米,智能手机',
        tags: '5G手机,快充手机,大容量电池手机',
        sort: '95'
      },
      rules: {
        brandId: [
          {type: 'number', required: true, message: '请选择品牌', trigger: 'blur'},
        ],
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
        ],
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
        ],
        description: [
          {required: true, message: '请输入简介', trigger: 'blur'},
        ],
        unit: [
          {required: true, message: '请输入计件单位', trigger: 'blur'},
        ],
        listPrice: [
          {required: true, message: '请输入售价', trigger: 'blur'},
        ],
        typeNumber: [
          {required: true, message: '请输入货号', trigger: 'blur'},
        ],
        stock: [
          {required: true, message: '请输入库存', trigger: 'blur'},
        ],
        stockThreshold: [
          {required: true, message: '请输入库存阈警值', trigger: 'blur'},
        ],
        keywords: [
          {required: true, message: '请输入关键词', trigger: 'blur'},
        ],
        tags: [
          {required: true, message: '请输入标签', trigger: 'blur'},
        ],
        sort: [
          {required: true, message: '请输入排序序号', trigger: 'blur'},
        ],
      }
    };
  },
  methods: {
    // 加载本地的表单中的数据,存放到roleForm中去
    loadLocalRuleForm(){
      let localRuleFormString = localStorage.getItem('ruleForm');
      if (localRuleFormString){
        let localRuleForm = JSON.parse(localRuleFormString);
        if (localRuleForm.brandId){// 如果有品牌id说明从第三个页面过来的
          this.ruleForm = localRuleForm;
        }else {
          this.ruleForm.categoryId = localRuleForm.categoryId;
          this.ruleForm.categoryName = localRuleForm.categoryName;
        }
      }
    },
    backToPreStep() {
      this.$router.push('spu-add-new');
    },
    loadBrandList(){
      let url ='http://localhost:9080/brands';
      console.log('url='+url);
      this.axios
      .create(
          {'headers':{'Authorization':localStorage.getItem('jwt')}}
      ).get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.brandListOptions = responseBody.data;
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9080/brands/'+this.ruleForm.brandId+'/select';
          console.log('url = ' + url);
          this.axios
              .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
              .get(url).then((response) => {
            let responseBody = response.data;
            if (responseBody.state == 20000) {
              this.ruleForm.brandName = responseBody.data.name;
              let ruleFormString = JSON.stringify(this.ruleForm);
              console.log('ruleFormString >>> ' + ruleFormString);
              localStorage.setItem('ruleForm', ruleFormString);
              this.$router.push('spu-add-new3');
            } else {
              this.$message.error(responseBody.message);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.loadBrandList();
    this.loadLocalRuleForm();
  }
}
</script>

<style scoped>

</style>