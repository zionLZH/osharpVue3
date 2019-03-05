<template>
  <el-dialog
    :visible.sync="visibleBak"
    custom-class="gee-com-popover-select"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <template slot="title">{{title}}</template>
    <template slot="footer">
      <el-button size="small" @click="doClose">确定</el-button>
    </template>
    <template>
      <el-input v-model="keyword" placeholder="请输入搜索内容" size="small"></el-input>
      <div v-if="list.length == 0" style="margin-top: 40px;color: #909398;" align="center">暂无数据</div>
      <el-radio-group v-model="current">
        <el-radio v-for="(item,index) in list" v-if="isActive(item)" :key="index" :label="modelScope(item)">{{showKey ? item[showKey] : item}}</el-radio>
      </el-radio-group>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '请选择'
    },
    filters: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    scope: {
      default: 'this'
    },
    showKey: {
      type: String,
      default: ''
    },
    currentItem: {
      default: ''
    }
  },
  data () {
    return {
      keyword: '',
      current: '',
      visibleBak: false
    }
  },
  methods: {
    isActive (item) {
      if (this.keyword.replace(/(( )|(\t)|(\n))/gi, '') === '') {
        return true
      }
      if (this.filters.length === 0) {
        return JSON.stringify(item).indexOf(this.keyword) !== -1
      }
      for (let i = 0; i < this.filters.length; i++) {
        if (JSON.stringify(item[this.filters[i]]).indexOf(this.keyword) !== -1) {
          return true
        }
      }
      return false
    },
    modelScope (item) {
      return this.scope === 'this' ? item : item[this.scope]
    },
    doClose () {
      this.$emit('update:visible', false)
      this.visibleBak = false
    }
  },
  watch: {
    current: {
      handler () {
        this.$emit('update:currentItem', this.current)
      },
      deep: true
    }
  },
  mounted () {
    if (this.currentItem) {
      this.current = this.scope === 'this' ? this.currentItem : this.currentItem[this.scope]
    }
    if (this.visible) {
      this.visibleBak = true
    }
  }
}
</script>

<style lang="scss">
.gee-com-popover-select {
  max-width: 100%;
  min-width: 320px;
  width: 320px;
  &>* {
    max-width: 100%;
  }
  .el-dialog__body {
    padding: 10px 20px;
    .el-radio-group {
      width: 100%;
      height: auto;
      max-height: 245px;
      margin-top: 5px;
      padding: 10px;
      overflow-x: hidden;
      overflow-y: scroll;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      .el-radio {
        display: block;
        height: 26px;
        margin: 0px;
        padding: 0px;
        line-height: 26px;
      }
    }
  }
  button {
    color: #fff !important;
    background-color: #4b9e65 !important;
    border-color: #4b9e65 !important;
    &:active {
      opacity: 0.6;
    }
  }
}
</style>
