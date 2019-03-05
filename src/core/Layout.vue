<template>
  <div class="layout-contariner">
    <div class="progress" v-if="progress != 100" :style="{width: progress + '%'}"></div>
    <navBar :theme="theme" logo="../assets/geeAdmin.png"></navBar>
    <navMenu v-if="$route.name !== 'grub'" :theme="theme"></navMenu>
    <router-view class="app-main" :class="{pageMini: sys.pageMini}" :style="{marginTop: $route.name !== 'grub' ? '' : '60px'}" :isMobile="sys.pageMini"></router-view>
  </div>
</template>

<script>
import navBar from './navBar.vue'
import navMenu from './menu.vue'
import { Core, bridge } from './lib/const'

const gcore = new Core()
export default {
  components: { navBar, navMenu },
  data () {
    return {
      sys: gcore,
      theme: 'dark',
      progress: 100
    }
  },
  mounted () {
    bridge.$on('triggerTheme', (a) => {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    })
    this.$router.beforeHooks.push((to, from, next) => {
      this.progress = 0
      var timer = setInterval(() => {
        if (this.progress >= 90) {
          clearInterval(timer)
          return
        }
        this.progress += 10
      }, 300)
      next()
    })
    this.$router.beforeHooks.push((to, from, next) => {
      this.progress = 99.9
      setTimeout(() => {
        this.progress = 100
      }, 100)
      next()
    })
  }
}
</script>

<style scoped>
.app-main {
  margin: 105px 15px 15px 15px;
}
.app-main.pageMini {
  margin-top: 59px;
}
.progress {
  z-index: 11;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 0%;
  height: 3px;
  background-color: #17A05D;
  box-shadow: 0px 0px 2px 0px #f2f2f2;
}
</style>

<style>
.c-green {
  color: #4b9e65 !important;
}
.bgc-green {
  background-color: #4b9e65 !important;
}
</style>
