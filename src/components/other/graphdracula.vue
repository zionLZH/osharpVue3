<template>
  <div :id="id" class="gee-com-graphdracula" :style="{width: width, height: height}"></div>
</template>

<script>
var Dracula = require('graphdracula')
var Renderer = Dracula.Renderer.Raphael
var Layout = Dracula.Layout.Spring

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
      type: Object
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
          document.getElementById(this.getId()).innerHTML = ''
          var layout = new Layout(this.option)
          layout.layout()
          var renderer = new Renderer('#' + this.id, this.option, this.$el.offsetWidth, 800)
          renderer.draw()
        } catch (e) {
          // nothing
          console.error(e)
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
    }
  },
  computed: {
    id () {
      return 'geeComGraphdracula' + parseInt(Math.random() * 100000000)
    }
  },
  mounted () {
    if (this.option) {
      var layout = new Layout(this.option)
      layout.layout()
      var renderer = new Renderer(this.id, this.option, 1024, 800)
      renderer.draw()
    }
  }
}
</script>

<style>
</style>
