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
            <a href=""
               class="loginout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px"
                class="aside">Aside</el-aside>
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
  width: 35%;
  height: 35%;
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
