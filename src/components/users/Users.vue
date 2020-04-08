<template>
  <el-card class="box-card">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入内容"
                  v-model="query"
                  class="inputSearch">
          <el-button slot="append"
                     icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column label="#"
                       width="60"
                       type="index">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名"
                       width="80">
      </el-table-column>
      <el-table-column prop="address"
                       label="邮箱">
      </el-table-column>
      <el-table-column prop="address"
                       label="电话">
      </el-table-column>
      <el-table-column prop="address"
                       label="创建时间">
      </el-table-column>
      <el-table-column prop="address"
                       label="用户状态">
      </el-table-column>
      <el-table-column prop="address"
                       label="操作">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      query: '', // 查询条件
      pagenum: 1,
      pagesize: 10,
      // 绑定的数据
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }]

    }
  },
  methods: {
    // query 查询参数 可以为空
    // pagenum 当前页 不能为空
    // pagesiz 每页显示条 不能为空
    // 获取用户列表
    async getUserList () {
      // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
      const AUTH_TOKEN = localStorage.getItem('access-token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(res)
    }
  },
  created () { // 页面加载前
    this.getUserList()
  }
}
</script>
<style lang="css">
.box-card {
  height: 100%;
}
.inputSearch {
  width: 300px;
}
.searchRow {
  margin-top: 20px;
}
</style>
