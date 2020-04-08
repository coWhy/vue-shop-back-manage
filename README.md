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
   
  > js编程式导航 this.$router.push({ name: 'home' })
  > App.vue router-view
  > 新建home组件 配置路由

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
   > 目的：如果用户没登录 -> url直接到home组件->
   > 在登录成功时 保存正确用户的token值
  ```js
    localStorage.setItem('access-token', data.token)
  ```  
#### 14 首页 布局容器 使用  样式调整
> 引入布局容器
#### 15 首页  头部  样式调整
> layout 布局
> el-row 行
> el-col 列
> 注意: 24栏
#### 16 首页 侧边栏 导航组件
> el-menu
> router 开启路由模式 true index==path值
> unique-opened 是否只保持一个子菜单的展开
#### 17 首页 侧边栏 引入导航组件 调整
> 调整el-menu 
> index 不能一样
#### 18 进入首页的权限认证
> 如果登陆过 就不能进入到home组件
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
  > home.vue 开启了路由模式 index值 --> path值
  > home.vue main-> router-view
  > 新建users.vue
  > router/index.js 配置
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
  > el-card 小容器
  > 面包屑
  > el-row>el-col>input+el-button
  > 调整样式
  #### 22 用户管理 用户列表 引入表格组件
  > el-table[data--数据源] > el-table-column[label--表头/prop=“数据"] > 字符串类型数据
  ```js
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
  > 按照效果 调整了表头的数量和label
  > type="index" 该列的每个单元格的内容从1开始
  #### 24 用户管理 用户列表 请求数据 设置请求头
  > 通过axios中关于请求头的设置
  > 除了登录之外的所有请求都需要进行授权->设置请求头 Authorization
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
  > 解析赋值
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
  > 不同组件的数据不是共享的 而是独立作用域
  ```js
    <!--  template
          内部要用数据 设置slot=scope属性
          该属性的值是要用数据create_time的数据源userList

          slot-scope的值userList其实就是el-table绑定的数据userList
          userList.row->数组中的每个对象
    -->
  ``` 
  > Users.vue中
  ```js
     <template slot-scope="scope">
          {{scope.row.create_time|fmtdate}}
     </template>
  ```
  > 引入moment 在main.js设置全局过滤器 进行日期控制
  ```js
    import moment from 'moment'
    Vue.filter('fmtdate', v => {
      return moment(v).format('YYYY-MM-DD')
    })
  ```
  #### 27 用户管理 用户列表 渲染数据 用户状态开关
  > el-switch v-model="[bool值]"
  ```js
     <el-table-column label="用户状态">

        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </template>
        
      </el-table-column>
  ```