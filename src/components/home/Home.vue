<template>
  <div>
    首页
    <ul>
      <!-- <li>{{userInfo.username}}</li>
      <li>{{userInfo.mobile}}</li> -->

      <li>{{info}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: {},
      info: ''
    }
  },
  methods: {
    getUserInfo () {
      this.userInfo = localStorage.getItem('userInfo')
      this.info = localStorage.getItem('info')
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
