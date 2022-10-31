<style>
.layout-header {
  background: #1684b0;
}
.layout-header h1 {
  color: #fff;
  text-align: left;
  line-height: 60px;
}
i{
  color: white !important;
}
</style>

<template>
  <div>
    <!-- 最外层容器 -->
    <el-container>
      <!-- 上半部分: 顶栏 -->
      <el-header class="layout-header">
        <h1>酷鲨商城运营管理平台</h1>
      </el-header>
      <!-- 下半部分: 容器 -->
      <el-container>
        <!-- 下半部分的左侧边栏 -->
        <el-aside width="260px">
          <el-menu
              style="height: 1000px"
              default-active="1"
              class="el-menu-vertical-demo"
              background-color="#2c3e50"
              text-color="#fff"
              active-text-color="#ffd04b">
            <el-menu-item index="1">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>临时页面</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-setting"></i>
                <span slot="title">添加管理员</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-setting"></i>
                <span slot="title">管理员列表</span>
              </el-menu-item>
              <el-menu-item index="1-3">
                <i class="el-icon-setting"></i>
                <span slot="title">添加品牌</span>
              </el-menu-item>
              <el-menu-item index="1-4">
                <i class="el-icon-setting"></i>
                <span slot="title">品牌列表</span>
              </el-menu-item>
              <el-menu-item index="1-5">
                <i class="el-icon-setting"></i>
                <span slot="title">添加类别</span>
              </el-menu-item>
              <el-menu-item index="1-6">
                <i class="el-icon-setting"></i>
                <span slot="title">类别列表</span>
              </el-menu-item>
              <el-menu-item index="1-7">
                <i class="el-icon-setting"></i>
                <span slot="title">添加相册</span>
              </el-menu-item>
              <el-menu-item index="1-8">
                <i class="el-icon-setting"></i>
                <span slot="title">相册列表</span>
              </el-menu-item>
              <el-menu-item index="1-9">
                <i class="el-icon-setting"></i>
                <span slot="title">添加属性模板</span>
              </el-menu-item>
              <el-menu-item index="1-10">
                <i class="el-icon-setting"></i>
                <span slot="title">属性模板列表</span>
              </el-menu-item>
              <el-menu-item index="1-11">
                <i class="el-icon-setting"></i>
                <span slot="title">添加属性</span>
              </el-menu-item>
              <el-menu-item index="1-12">
                <i class="el-icon-setting"></i>
                <span slot="title">属性列表</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>
                <span slot="title">SPU台账</span>
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>
                <span slot="title">新增SPU</span>
              </el-menu-item>
              <el-menu-item index="2-3">
                <i class="el-icon-menu"></i>
                <span slot="title">相册管理</span>
              </el-menu-item>
              <el-menu-item index="2-4">
                <i class="el-icon-menu"></i>
                <span slot="title">商品类别</span>
              </el-menu-item>
              <el-menu-item index="2-5">
                <i class="el-icon-menu"></i>
                <span slot="title">属性模板</span>
              </el-menu-item>
              <el-menu-item index="2-6">
                <i class="el-icon-menu"></i>
                <span slot="title">品牌管理</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>订单管理</span>
              </template>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-s-ticket"></i>
                <span>营销管理</span>
              </template>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-s-shop"></i>
                <span>商家管理</span>
              </template>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-s-check"></i>
                <span>权限管理</span>
              </template>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 下半部分的右侧主体部分 -->
        <el-main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
</script>
