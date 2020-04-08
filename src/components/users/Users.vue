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
        <el-input @clear="loadUserList()"
                  placeholder="请输入内容"
                  v-model="query"
                  class="inputSearch"
                  clearable>
          <el-button slot="append"
                     @click="searchUser()"
                     icon="el-icon-search">
          </el-button>
        </el-input>
        <el-button type="success"
                   plain>添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="userList"
              style="width: 100%">
      <el-table-column label="#"
                       width="60"
                       type="index">
      </el-table-column>
      <el-table-column prop="username"
                       label="姓名"
                       width="80">
      </el-table-column>
      <el-table-column prop="email"
                       label="邮箱">
      </el-table-column>
      <el-table-column prop="mobile"
                       label="电话">
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{scope.row.create_time|fmtdate}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="mini"
                     plain
                     circle>
          </el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     size="mini"
                     plain
                     circle>
          </el-button>
          <el-button type="success"
                     icon="el-icon-check"
                     size="mini"
                     plain
                     circle>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pagenum"
                   :page-sizes="[2, 4, 6, 8]"
                   :page-size="pagesize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      query: '', // 查询条件
      // 绑定的数据
      userList: [],
      // 分页相关数据
      pagenum: 1,
      pagesize: 2,
      total: -1

    }
  },
  methods: {
    // 搜索框没数据了之后 重新加载
    loadUserList () {
      this.getUserList()
    },
    // 搜索用户
    searchUser () {
      this.getUserList()
    },
    // 分页相关方法
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      console.log(`当前页 ${val}`)
      this.pagenum = val
      this.getUserList()
    },
    // id: 502
    // role_name: "测试角色2"
    // username: "linken"
    // create_time: 1486720211
    // mobile: "1213213123"
    // email: "asdf@qq.com"
    // mg_state: false

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
      const { data: { users, total }, meta: { msg, status } } = res.data
      if (status === 200) {
        this.userList = users
        this.total = total
        // this.pagenum = 1
      } else {
        this.$message.error(msg)
      }
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
