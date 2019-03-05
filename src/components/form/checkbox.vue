<template>
  <div class="gee-com-checkbox">
    <el-input v-model="keyword" :placeholder="placeholder" clearable></el-input>
    <el-checkbox-group class="checkbox-container" v-model="actives" @change="onChange">
      <div v-if="list.length == 0" class="no-data">无数据</div>
      <el-checkbox v-for="(item,index) in list" v-show="filter(item)" :key="index" :label="showScope(item)">{{showData(item)}}</el-checkbox>
    </el-checkbox-group>
    <div align="right">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="onFullSelect">全选</el-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请输入数据'
    },
    scope: {
      type: String,
      default: 'this'
    },
    showKey: {
      type: String,
      default: 'this'
    },
    checks: {
      type: Array,
      default: () => []
    }
  },
  model: {
    prop: 'checks',
    event: 'vmodel'
  },
  data () {
    return {
      keyword: '',
      actives: [],
      isIndeterminate: false,
      checkAll: false
    }
  },
  watch: {
    actives: {
      handler () {
        this.$emit('vmodel', this.actives)
      },
      deep: true
    }
  },
  methods: {
    showScope (item) {
      if (!this.scope || this.scope === 'this') {
        return item
      }
      return item[this.scope]
    },
    showData (item) {
      if (!this.showKey || this.showKey === 'this') {
        return item
      }
      return item[this.showKey]
    },
    onFullSelect (is) {
      this.actives = []
      if (is) {
        for (let i = 0; i < this.list.length; i++) {
          this.actives.push(this.showScope(this.list[i]))
        }
      }
      this.$emit('vmodel', is ? this.actives : [])
      this.isIndeterminate = false
    },
    onChange (arrs) {
      this.actives = arrs
      this.$emit('vmodel', arrs)
      this.checkAll = arrs.length === this.list.length
      this.isIndeterminate = arrs.length > 0 && arrs.length < this.list.length
    },
    filter (item) {
      if (!this.keyword || this.keyword.replace(/( |\r|\n|\t)/, '') === '') {
        return true
      }
      if (this.filters.length === 0) {
        try {
          return JSON.stringify(item).indexOf(this.keyword) !== -1
        } catch (e) {
          return false
        }
      } else {
        for (let i = 0; i < this.filters.length; i++) {
          if (item[this.filters[i]].indexOf(this.keyword) !== -1) {
            return true
          }
        }
        return false
      }
    }
  },
  mounted () {
    this.actives = this.checks
  }
}
</script>

<style lang="scss" scoped>
.gee-com-checkbox {
  width: 270px;
  .el-checkbox {
    margin-right: 0px;
  }
  .no-data {
    font-size: 14px;
    color: #9d9d9d;
    text-align: center;
  }
  .checkbox-container {
    height: auto;
    height: 188px;
    margin: 5px 0px;
    padding: 5px;
    border: 1px solid #dddfe6;
    border-radius: 5px;
    overflow: scroll;
    .el-checkbox {
      display: block;
    }
  }
}
</style>
