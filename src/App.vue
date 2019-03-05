<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "@/components/style/dialogClear.scss";
@import "@/core/style/style.scss";
html,body {
  margin: 0px;
  padding: 0px;
  font-family:-apple-system , BlinkMacSystemFont , "Segoe UI" , Roboto , "Segoe UI" , "Helvetica Neue", "PingFang SC", "Noto Sans" , "Noto Sans CJK SC" , "Microsoft YaHei" , "微软雅黑" , sans-serif !important;
  color: #333;
  line-height: 1;
  background-color: #f5f5f5 !important;
}
</style>
