<template>
  <div class="login-wrap">
    <el-form class="login-form"
             label-position="top"
             label-width="80px"
             :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"
                  placeholder="请输入用户名">

        </el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"
                  placeholder="请输入密码"
                  show-password></el-input>
      </el-form-item>
      <el-button class="login-btn"
                 type="primary"
                 @click="handleLogin()">登陆
      </el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formdata: {
        username: '', // 用户名
        password: ''// 登陆密码
      }
    }
  },
  methods: {
    // 登录请求
    // 希望 让异步操作的代码 看起来像同步代码
    // Es7 async+awit
    async handleLogin () {
      const res = await this.$http.post('login', this.formdata)
      const { data, meta: { msg, status } } = res.data
      if (status === 200) {
        console.log(JSON.stringify(data))
        // 保存toekn 用于登录验证使用 先判断是否存在token
        var accessToken = localStorage.getItem('access-token')
        if (!accessToken) {
          localStorage.setItem('access-token', data.token)
        }

        this.$message.success('登录成功')
        this.$router.push({ name: 'home' })
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>
<style>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  /* 弹性布局 */
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background-color: #fff;
  width: 300px;
  padding: 30px;
  /* 圆角 */
  border-radius: 5px;
}
.login-wrap .login-form .login-btn {
  width: 100%;
}
</style>
