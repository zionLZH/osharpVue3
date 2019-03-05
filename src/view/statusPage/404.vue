<template>
  <div class="not-found-container" align="center">
    <img src="../../assets/404.gif" alt="" />
    <div class="in-line">页面无法寻找，您可以尝试以下操作。</div>
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
  }
}
</script>

<style lang="scss" scoped>
.not-found-container {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  img {
    margin-top: 15vh;
    width: 100%;
    max-width: 500px;
  }
  .count {
    margin-top: 30px;
    font-size: 28px;
    color: #4b9e65;
  }
  .in-line {
    margin-top: 30px;
  }
}
</style>
