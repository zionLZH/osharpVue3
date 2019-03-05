<template>
  <div class="gee-com-fn-group" :class="{flex: flex}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    inputBlock: {
      type: Boolean,
      default: false
    },
    buttonBlock: {
      type: Boolean,
      default: false
    },
    flex: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.gee-com-fn-group {
  display: flex;
  flex-wrap: wrap;
  .el-input,input {
    width: auto;
  }
  & > * {
    flex-shrink: 0;
    margin: 0px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
.gee-com-fn-group.flex {
  display: flex;
  flex-wrap: wrap;
  flex-basis: 0%;
  & > * {
    flex-grow: 1;
    margin: 0px 5px;
    margin-bottom: 5px;
  }
  .el-input,input {
    flex-grow: 1;
    flex-shrink: 0;
  }
}
@media only screen and (min-width: 100px) and (max-width: 640px) {
  .gee-com-fn-group {
    display: flex;
    flex-wrap: wrap;
    flex-basis: 0%;
    & > * {
      flex-grow: 1;
      margin: 0px 5px;
      margin-bottom: 5px;
    }
    .el-input,input {
      flex-grow: 1;
      flex-shrink: 0;
    }
  }
}
</style>
