<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple"><img :src="logo"
                 alt="无法显示图片"
                 class="logo"></div>
        </el-col>
        <el-col :span="18"
                class="middle">
          <div class="grid-content bg-purple-light">
            <h3>电商后台管理系统</h3>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="loginout"
               @click.prevent="handleSignout()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px"
                class="aside">
        <el-menu :unique-opened="true">
          <!-- 用户部分 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <li class="el-icon-user"></li>
                <span> 用户列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 权限部分 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <li class="el-icon-document-copy"></li>
                <span> 权限列表</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <li class="el-icon-s-check"></li>
                <span> 角色列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 商品部分 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <li class="el-icon-goods"></li>
                <span>商品列表</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <li class="el-icon-setting"></li>
                <span>分类参数</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <li class="el-icon-warning-outline"></li>
                <span>商品分类</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 订单部分 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-shopping-cart-full"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <li class="el-icon-document-copy"></li>
                <span>订单列表</span>
              </el-menu-item>
            </el-menu-item-group>

          </el-submenu>

          <!-- 数据统计 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <li class="el-icon-document-checked"></li>
                <span>数据报表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main class="main">Main
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      logo: require('@/assets/logo.png')
    }
  },
  methods: {
    handleSignout () {
      // 清除token
      localStorage.clear()
      // localStorage.removeItem('access-token')
      this.$message.success('退出成功')
      this.$router.push({ name: 'login' })
    }
  },
  beforeCreate () {
    // 获取token
    // if token --> yes-->继续渲染组件 不能写在mounted 要写在组件出现之前
    // else --> 返回登录页面
    const accessToken = localStorage.getItem('access-token')
    if (!accessToken) {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang="css">
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
/* 头部样式 */
.logo {
  text-align: center;
  width: 30%;
  height: 30%;
}
.middle {
  /* line-height: 60px; */
  text-align: center;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
</style>
