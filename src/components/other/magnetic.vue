<template>
  <div class="gee-com-magnetic">
    <div v-if="showReturn || title" class="title">
      <el-button v-if="showReturn" size="mini" type="primary" @click="doReturn">返回</el-button>
      <span v-if="title" v-text="title"></span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    showReturn: {
      type: Boolean,
      default: false
    },
    returnRouter: {
      type: String,
      default: ''
    }
  },
  methods: {
    doReturn () {
      if (!this.returnRouter) {
        this.$router.go(-1)
        return
      }
      if (this.returnRouter.indexOf('/') !== -1 || this.returnRouter.indexOf('?') !== -1) {
        this.$router.push(this.returnRouter)
        return
      }
      this.$router.push({
        name: this.returnRouter
      })
    }
  }
}
</script>

<style lang="scss" scope>
.gee-com-magnetic {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  transition: all 1s;
  &:hover {
    /*box-shadow: 0px 0px 8px 0px #ccc;*/
  }
  &>.title {
    font-size: 16px;
    margin-bottom: 10px;
    .el-button {
      margin-right: 10px;
    }
  }
}
</style>
