<template>
  <div class="not-found-container" align="center">
    <div class="count" v-text="count"></div>
    <div class="in-line">
      您的用户
      <label style="color: red;">暂无权限</label>
      访问此页面，您可以尝试以下操作。
    </div>
    <div class="in-line">
      <el-button type="success" @click="doBack">返回</el-button>
      <el-button @click="toIndex">首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 200
    }
  },
  methods: {
    doBack () {
      this.$router.go(-1)
    },
    toIndex () {
      this.$router.replace({
        path: '/'
      })
    }
  },
  mounted () {
    const VM = this
    const timer = setInterval(() => {
      VM.count += 4
      if (VM.count + 3 >= 401) {
        VM.count = 401
        clearInterval(timer)
      }
    }, 30)
  }
}
</script>

<style lang="scss" scoped>
.not-found-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .count {
    margin-top: 15vh;
    font-size: 16vh;
    color: #4b9e65;
  }
  .in-line {
    padding: 0px 40px;
    margin-top: 30px;
  }
}
</style>
