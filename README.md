#### Vue-项目重点

#### 重点
> src/ <br>
> build/ webpack相关代码<br>
> config/ 本地服务器配置<br>
> .eslintignore eslint排除文件<br>
> .eslintrc  eslint配置文件<br>

#### 01 代码规范 lint fix 
> 结尾有 ; <br>
> if(a==b){} ===> if(a===b){} 必须用全等<br>
> 不允许出现未使用的变量<br>
> 不允许超过2个空行<br>
> 使用单引号 ''<br>

> 在 package.json 中 自定义指令 ： 指令很长<br>
> npm run + [自定义指令名]<br>
> 自动打开浏览器 dev: 'webpack-dev-server --inline --progress --config build/webpack.dev.conf.js--open' <br>

#### 02 element-ui文档分析
> element-ui 是饿了吗团队开发<br>
> 适用于vue项目<br>
> npm 安装 npm i element-ui -s<br>
> 引入element-ui   在 main.js 入口文件中写入:<br>
```js
   import ElementUI from 'element-ui';
   import 'element-ui/lib/theme-chalk/index.css';
   Vue.use(ElementUI);
```
#### 03 项目简化 
> 删除模板中 用不到的文件<br>
#### 04 git版本控制
~ git/svn 管理代码<br>
> git init --> .git<br>
> git status<br>
> git add .<br>
> git commit -m '注释'<br>
> 在代码托管平台(github) 新建远程仓库<br>
> git remote add origin '***.git'<br>
> git push  -u origin master (之后再推送 就 git push)<br>
#### 05 新建分支 login 组件 配置路由
> git branch<br>
> checkout -b dev-login<br>
> 新建组件 + 配置路由<br>
> 注意：commit每完成一个小功能 就commit一次 <br>
> push 操作master去完成 <br>
#### 06 登陆 引入表单组件
> el-form-item <br>
> 调整标签<br>
> label-position="top"<br>
#### 07 登录样式调整
> height 100%<br>
> 注意: div #app height:100%<br>
#### 08 登录 axios插件
> axios不是vue插件 --->Vue.use(**)<br>
```js
    // 自定义开发插件
    import axios from 'axios'
    const MyHttpServer = {}

    MyHttpServer.install = Vue => {
      Vue.prototype.$http = axios
    }
    export default MyHttpServer
```
> 在main.js中<br>
```js
    import http from '@/plugins/http' // 自定义全局样式
    // 使用axios自定义开发插件
    Vue.use(http)
```
#### 09 登录 发送登录请求

> Login.vue methods handleLogin()<br>
```js
     this.$http.post('login', this.formdata)
        .then(res => {

        })
```
> 对象结构解析 res.data<br
```js
      const { data,
            meta: {
              msg,
              status
            }
          } = res.data  
```
#### 10 登录 引入提示框组件
  ```js
  this.$message.success('登录成功')
  ```
#### 11 登录 登录成功-进入 home组件
   
  > js编程式导航 this.$router.push({ name: 'home' })<br>
  > App.vue router-view<br>
  > 新建home组件 配置路由<br>

#### 12 登录 简化登录请求代码 async awit 看起来像同步代码
  ```js
     async handleLogin () {
      const res = await this.$http.post('login', this.formdata)
      const { data, meta: { msg, status } } = res.data
      if (status === 200) {
        console.log(JSON.stringify(data))
        this.$message.success('登录成功')
      } else {
        this.$message.warning(msg)
      }
    }  
  ```  
  #### 13 登录 保存token值
   > 目的：如果用户没登录 -> url直接到home组件-><br>
   > 在登录成功时 保存正确用户的token值<br>
  ```js
    localStorage.setItem('access-token', data.token)
  ```  
#### 14 首页 布局容器 使用  样式调整
> 引入布局容器
#### 15 首页  头部  样式调整
> layout 布局<br>
> el-row 行<br>
> el-col 列<br>
> 注意: 24栏<br>
#### 16 首页 侧边栏 导航组件
> el-menu<br>
> router 开启路由模式 true index==path值<br>
> unique-opened 是否只保持一个子菜单的展开<br>
#### 17 首页 侧边栏 引入导航组件 调整
> 调整el-menu <br>
> index 不能一样<br>
#### 18 进入首页的权限认证
> 如果登陆过 就不能进入到home组件<br>
```js
 beforeCreate () {
    // 获取token
    // if token --> yes-->继续渲染组件 不能写在mounted 要写在组件出现之前
    // else --> 返回登录页面
    const accessToken = localStorage.getItem('access-token')
    if (!accessToken) {
      this.$router.push({ name: 'login' })
    }
  }
```
#### 19 首页 头部 退出
```js
 handleSignout () {
      // 清除token
      localStorage.clear()
      // localStorage.removeItem('access-token')
      this.$message.success('退出成功')
      this.$router.push({ name: 'login' })
    }
```
#### 20 用户管理 用户列表 新建组件 路由配置
  > home.vue 开启了路由模式 index值 --> path值<br>
  > home.vue main-> router-view<br>
  > 新建users.vue<br>
  > router/index.js 配置<br>
  ```js
   {
      path: '/home',
      name: 'home',
      component: () => import('@/components/home/Home.vue'),
      children: [
        {
          path: '/users',
          name: 'users',
          component: () => import('@/components/users/Users.vue')
        }
      ]
  ```
  #### 21 用户管理 用户列表 面包屑和搜框
  > el-card 小容器<br>
  > 面包屑<br>
  > el-row>el-col>input+el-button<br>
  > 调整样式<br>
  #### 22 用户管理 用户列表 引入表格组件
  > el-table[data--数据源] > el-table-column[label--表头/prop=“数据"] > 字符串类型数据
  ```html
   <!-- 表格 -->
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column prop="date"
                       label="日期"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名"
                       width="180">
      </el-table-column>
      <el-table-column prop="address"
                       label="地址">
      </el-table-column>
    </el-table>
  ```
  #### 23 用户管理 用户列表表头处理
  > 按照效果 调整了表头的数量和label<br>
  > type="index" 该列的每个单元格的内容从1开始<br>
  #### 24 用户管理 用户列表 请求数据 设置请求头
  > 通过axios中关于请求头的设置<br>
  > 除了登录之外的所有请求都需要进行授权->设置请求头 Authorization<br>
  ```js
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  ```
  ```js
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
  ```
  #### 25 用户管理 用户列表 渲染列表
  > 解析赋值<br>
  ```js
   const { data: { users, total }, meta: { msg, status } } = res.data
      if (status === 200) {
        this.userList = users
        this.total = total
      } else {
        this.$message.error(msg)
      }
  ```
  #### 26 用户管理 用户列表 日期格式处理
  > 不同组件的数据不是共享的 而是独立作用域<br>
  ```html
    <!--  template
          内部要用数据 设置slot=scope属性
          该属性的值是要用数据create_time的数据源userList

          slot-scope的值userList其实就是el-table绑定的数据userList
          userList.row->数组中的每个对象
    -->
  ``` 
  > Users.vue中<br>
  ```html
     <template slot-scope="scope">
          {{scope.row.create_time|fmtdate}}
     </template>
  ```
  > 引入moment 在main.js设置全局过滤器 进行日期控制<br>
  ```js
    import moment from 'moment'
    Vue.filter('fmtdate', v => {
      return moment(v).format('YYYY-MM-DD')
    })
  ```
  #### 27 用户管理 用户列表 渲染数据 用户状态开关
  > el-switch v-model="[bool值]"
  ```html
     <el-table-column label="用户状态">

        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </template>

      </el-table-column>
  ```
  #### 28 用户管理 用户列表 渲染数据 操作
  > 操作里面不是字符<br>
  > template容器 <br>
  > el-button[size="mini"&plain]<br>
  #### 28 用户管理 用户列表 分页组件 
  > 该接口支持分页<br>
  > @size-change 每页显示条数 变化时 触发<br>
  > @current-change 当前页改变时 触发<br>
  > :current-page 设置当前页<br>
  > :page-sizes [10,20,30,40] 每页多少条的数组<br>
  > :page-size 设置每页显示多少条<br>
  > :total 数据总数<br>
  #### 29 用户管理 用户列表 分页组件 配置数据
  ```html
   <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pagenum"
                   :page-sizes="[2, 4, 6, 8]"
                   :page-size="pagesize"
                   layout="total, sizes, pre
                   v, pager, next, jumper"
                   :total="total">
    </el-pagination>
  ``` 
  > 每页显示条数改变 -> this.pagesize= val -> this.getUserList()<br>
  > 页码改变时 -> this,pagenum = val -> this.getUserList()<br>
  >  每页显示条数改变: 从第一页开始显示 this.pagenum = 1 -> currentpage = 1<br>
#### 30 用户管理 用户列表 分页组件 搜索用户
> 给搜索框绑定query v-model="query"<br>
> 点击搜索按钮 发送请求<br>
> 一键清除 clearable<br>
> 点击清除按钮 重新获取数据 @clear=""<br>
```html
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
```
#### 30 用户管理 用户列表 添加 用户 显示对话框
> 引入对话框 el-form<br>
> 点击添加用户的按钮 显示对话框 dialogFormVisibleAdd = false -> true<br>
> 配置对话框 <br>
> :model-form 添加用户所需要的数据<br>
```js
 form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }// 添加用户对象
```
> el-form>el-input v-model="form.xxx"<br>
#### 31 用户管理 用户列表 添加 用户 发送请求
> post  this.form<br>
> 关闭对话框<br>
> 清空文本框 this.form = {}<br>
> 更新视图 <br>
```js
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
```
#### 32 用户管理 用户列表 删除 用户 打开消息框
> this.$confirm<br>
> 点击确定 -> then<br>
> 点击取消 -> catch<br>
```js
 this.$confirm('确定要删除此用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
```
#### 32 用户管理 用户列表 删除 用户 处理响应
> 点击确定 -> 发送 delete 请求<br>
> 提示<br>
> 更新视图 返回第一页<br>
> 注意 async的位置 then(async () => {})
```js
        const res = await this.$http.delete(`users/${id}`)
        const { meta: { msg, status } } = res.data
        if (status === 200) {
          this.pagenum = 1 // 回到第一页
          this.$message.success('删除成功')
          this.getUserList()
        } else {
          this.$message.warning(msg)
        }
```
#### 32 用户管理 用户列表 编辑 用户 显示对话框
> 点击操作中的编辑按钮 打开编辑对话框<br>
> 提示对话框显示/隐藏的控制属性 dialogFormVisibleEdit <br>
> 找到编辑按钮 绑定@click -> 打开对话框  @click="dialogFormVisibleEdit=true"<br>
> form用的是之前添加时候用的<br>
#### 33 用户管理 用户列表 编辑 用户 显示编辑数据
> 点击编辑按钮  scope.row  @click="showEditUserDialog(scope.row)"<br>
> showEditUserDialog(user) 方法中 this.form = user 其中 user = scope.row<br>
#### 34 用户管理 用户列表 编辑 用户 发送请求
> 找到对话框的确定按钮 -> editUser() -> 发送请求 <br>
> this.form = user <br>
> id = this.form.id <br>
> 关闭对话框<br>
> 更新视图<br>
```js
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
```
> 先点编辑 再点添加 会残留缓存数据 <br>
> 打开添加对话框之前 清除残留数据 <br>
```js
  showAddUserDialog () {
      // 清除表格之前的缓存
      this.form = {}
      this.dialogFormVisibleAdd = true
    },
```
#### 35 用户管理 用户列表 修改用户状态
> 找到开关 @change 事件 changeMgState(scope.row)  scope.row --> user<br>
> 双向绑定 v-model="scope.row.mg_state"<br>
```html
  <el-switch v-model="scope.row.mg_state"
             active-color="#13ce66"
             @change="changeMgState(scope.row)"
             inactive-color="#ff4949">
  </el-switch>
```
#### 36 用户管理 用户列表 分配角色
> 点击按钮->打开对话框<br>
> 对话框 中有下拉框 <br>
> 修改当前用户的角色 <br>

> 每个角色的权限<br>
> 显示操作中的按钮  -> 打开对话框<br>
> 引入下拉框  如果select的绑定的数据的值 和 option 的value一样 就会显示该option的label的值<br>
> 分成两类 请选择 和 v-for动态生成的 option<br>
> data中提供了el-select 的 v-model 所绑定的数据
```html
 <el-select v-model="curRoleId">
            <el-option label="请选择"
                       :value="-1"></el-option>
            <!-- <el-option label="管理员"
                       value="shanghai"></el-option> -->
 </el-select>
```
> 当改变label时->label显示->改变了value->el-select v-model绑定的数据 自动关联<br>