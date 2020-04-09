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
                   @click="showAddUserDialog()"
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
                     @change="changeMgState(scope.row)"
                     inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="mini"
                     plain
                     @click="showEditUserDialog(scope.row)"
                     circle>
          </el-button>
          <el-button @click="showDelUserMsgBox(scope.row.id)"
                     type="danger"
                     icon="el-icon-delete"
                     size="mini"
                     plain
                     circle>
          </el-button>
          <el-button type="success"
                     icon="el-icon-check"
                     size="mini"
                     plain
                     @click="showSetUserRole(scope.row)"
                     circle>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pagenum"
                   :page-sizes="[4, 8, 16, 32]"
                   :page-size="pagesize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>

    <!-- 对话框 -->
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户"
               :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名"
                      :label-width="formLabelWidth">
          <el-input v-model="form.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      :label-width="formLabelWidth">
          <el-input v-model="form.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      :label-width="formLabelWidth">
          <el-input v-model="form.email"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话"
                      :label-width="formLabelWidth">
          <el-input v-model="form.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary"
                   @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户"
               :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名"
                      :label-width="formLabelWidth">
          <el-input v-model="form.username"
                    :disabled="true"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      :label-width="formLabelWidth">
          <el-input v-model="form.email"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话"
                      :label-width="formLabelWidth">
          <el-input v-model="form.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary"
                   @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配用户角色对话框 -->
    <el-dialog title="分配角色"
               :visible.sync="dialogFormVisibleSetRole">
      <el-form :model="form">
        <el-form-item label="用户名"
                      :label-width="formLabelWidth">
          {{form.username}}
        </el-form-item>
        <el-form-item label="角色名称"
                      :label-width="formLabelWidth">
          <!-- 如果select的绑定的数据的值 和 option 的value一样 就会显示该option的label的值 -->
          <el-select v-model="curRoleId">
            <el-option label="请选择"
                       :value="-1"></el-option>
            <el-option :label="item"
                       v-for="(item,i) in 5"
                       :key="i"
                       value="i"></el-option>
          </el-select>

        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisibleSetRole = false">取 消</el-button>
        <el-button type="primary"
                   @click="setUserRole()">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>
<script>
export default {
  data () {
    return {
      curRoleId: -1,
      query: '', // 查询条件
      // 绑定的数据
      userList: [],
      // 分页相关数据
      pagenum: 1,
      pagesize: 4,
      total: -1,
      dialogFormVisibleAdd: false, // 添加对话框的属性
      dialogFormVisibleEdit: false, // 编辑对话框的属性
      dialogFormVisibleSetRole: false, // 分配角色对话框的属性
      formLabelWidth: '100px',
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      } // 添加用户对象
      // curUserId: -1
    }
  },
  methods: {
    // 分配用户角
    showSetUserRole (user) {
      this.dialogFormVisibleSetRole = true
    },
    // 修改用户状态
    async changeMgState (user) {
      // 点击开关 -> mg_state 改变
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      const { meta: { msg, status } } = res.data
      if (status === 200) {
        this.$message.success('设置状态成功')
      } else {
        this.$message.warning(msg)
      }
    },
    // 编辑用户
    async editUser () {
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      const { meta: { msg, status } } = res.data
      if (status === 200) {
        this.dialogFormVisibleEdit = false
        this.$message.success('更新成功')
        this.getUserList()
      } else {
        this.$message.warning(msg)
      }
    },
    // 打开编辑窗口
    showEditUserDialog (user) {
      this.form = user // 提取这用户的数据 渲染到表单
      this.dialogFormVisibleEdit = true
    },
    // 打开删除信息框
    showDelUserMsgBox (id) {
      this.$confirm('确定要删除此用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除的请求 :id 用户id
        // 1.data中找有没有id x
        // 2.把用户id以参数方式传来 /
        const res = await this.$http.delete(`users/${id}`)
        const { meta: { msg, status } } = res.data
        if (status === 200) {
          this.pagenum = 1 // 回到第一页
          this.$message.success('删除成功')
          this.getUserList()
        } else {
          this.$message.warning(msg)
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    showAddUserDialog () {
      // 清除表格之前的缓存
      this.form = {}
      this.dialogFormVisibleAdd = true
    },
    // 添加用户
    async addUser () {
      const res = await this.$http.post('users', this.form)
      const { meta: { msg, status } } = res.data
      if (status === 201) {
        this.dialogFormVisibleAdd = false // 关闭对话框
        this.$message.success('添加成功') // 提示添加成功
        this.getUserList() // 更新视图
        this.form = {} // 清空form
      } else {
        this.$message.warning(msg)
      }
    },
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
