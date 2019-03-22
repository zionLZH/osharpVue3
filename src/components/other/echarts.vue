<template>
  <div :id="id" class="gee-com-echart" :style="{width: width, height: height}"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/map'
import 'echarts/map/js/china.js'
import { theme } from './data/echart_theme'
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    option: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      echart: {}
    }
  },
  watch: {
    option: {
      handler (op) {
        try {
          this.echart.setOption(op)
        } catch (e) {
          // nothing
        }
      },
      deep: true
    }
  },
  methods: {
    getModel () {
      return this.echart
    },
    getId () {
      return this.id
    },
    resize () {
      try {
        VM.echart.resize()
      } catch (e) {
        // nothing
      }
    }
  },
  computed: {
    id () {
      return 'geeComECharts' + parseInt(Math.random() * 100000000)
    }
  },
  mounted () {
    this.echart = echarts.init(document.getElementById(this.id), theme)
    this.echart.setOption(this.option)
    const VM = this
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
    this.echart.clear()
    this.echart.destroy()
    this.echart = {}
  }
}
</script>

<style>
</style>
