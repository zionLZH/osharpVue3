<template>
  <el-cascader
    :placeholder="placeholder"
    :options="citys"
    filterable
    v-model="selectData"
  ></el-cascader>
</template>

<script>
import cityData from './js/city.data-3'

export default {
  props: {
    type: {
      type: String,
      default: 'all'
    },
    provincial: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    area: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '试试搜索：鹿城'
    }
  },
  data () {
    let selected = []
    let props = ['provincial', 'city', 'area']
    for (let key in props) {
      if (this[props[key]]) {
        selected.push(this[props[key]])
      } else {
        break
      }
    }
    return {
      citys: cityData,
      selectData: selected
    }
  },
  watch: {
    selectData (val) {
      let props = ['provincial', 'city', 'area']
      for (let key in val) {
        this.$emit(`update:${props[key]}`, val[key])
      }
    },
    city () {
      let selected = []
      let props = ['provincial', 'city', 'area']
      for (let key in props) {
        if (this[props[key]]) {
          selected.push(this[props[key]])
        } else {
          break
        }
      }
      this.selectData = selected
    },
    area () {
      let selected = []
      let props = ['provincial', 'city', 'area']
      for (let key in props) {
        if (this[props[key]]) {
          selected.push(this[props[key]])
        } else {
          break
        }
      }
      this.selectData = selected
    },
    provincial () {
      let selected = []
      let props = ['provincial', 'city', 'area']
      for (let key in props) {
        if (this[props[key]]) {
          selected.push(this[props[key]])
        } else {
          break
        }
      }
      this.selectData = selected
    }
  }
}
</script>

<style scoped>

</style>
