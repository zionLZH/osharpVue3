<template>
  <el-select
    class="g-com-select"
    size="small"
    v-model="current"
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled"
    filterable
    :filter-method="onChange">
    <slot :data="filter"></slot>
  </el-select>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filters: {
      type: Array,
      default: () => []
    },
    currentItem: ''
  },
  model: {
    prop: 'currentItem',
    event: 'vmodel'
  },
  data () {
    return {
      keyword: '',
      current: ''
    }
  },
  watch: {
    current (val) {
      this.$emit('vmodel', val)
    }
  },
  methods: {
    onChange (val) {
      this.keyword = val
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
    this.current = this.currentItem
  }
}
</script>

<style lang="scss" scoped>
</style>
