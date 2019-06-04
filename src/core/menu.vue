<template>
  <div ref="navMenuCountainer" v-if="reload">
    <el-menu
      class="nav-menu-countainer"
      :class="{'pageMini': sys.pageMini, 'show': showMenu}"
      :mode="sys.pageMini?'vertical':'horizontal'"
      :unique-opened="true"
      :text-color="themeConf[theme].color"
      :active-text-color="themeConf[theme].active"
      :background-color="themeConf[theme].bgc"
      :default-active="menuIndex"
      @select="onMenuSelect">
      <div
        v-for="(item,index) in routes"
        :key="index"
        :index="indexCalc(item)"
        v-if="!item.h"
        :is="item.children.length == 1? 'el-menu-item':'el-submenu'"
        >
        <template v-if="item.children.length == 1">{{item.children[0].meta.title}}</template>
        <template v-else>
          <template slot="title">{{item.meta.title}}</template>
          <!--<el-menu-item v-for="(subItem, jndex) in item.children" v-if="!subItem.meta || !subItem.meta.hidden" :key="jndex" :index="item.path + '/' + subItem.path">{{subItem.meta.title}}</el-menu-item>-->
          <div
            v-for="(citem,index) in item.children"
            :key="index"
            :index="indexCalc(citem)"
            v-if="!citem.h"
            :is="!citem.children || citem.children.length == 1? 'el-menu-item':'el-submenu'"
          >
            <template v-if="!citem.children">{{citem.meta.title}}</template>
            <template v-else>
              <template slot="title">{{citem.meta.title}}</template>
              <el-menu-item v-for="(subItem, jndex) in citem.children" v-if="!subItem.h" :key="jndex" :index="indexCalc(subItem)">{{subItem.meta.title}}</el-menu-item>
            </template>
          </div>
        </template>
      </div>
    </el-menu>
    <div v-if="showMenu" class="nav-menu-mark" @click="closeMenu"></div>
  </div>
</template>

<script>
import { Core, bridge } from '@/core/lib/const'
import { currentRoutes } from '@/router/index'
import * as system from '@/utils/system'

const gcore = new Core()
export default {
  props: {
    theme: {
      type: String,
      default: 'light'
    }
  },
  data () {
    return {
      sys: gcore,
      reload: true,
      showMenu: false,
      themeConf: {
        light: {
          color: '#fff',
          active: '#16a05d',
          bgc: '#343539'
        },
        dark: {
          color: '#555',
          active: '#16a05d',
          bgc: '#fff'
        }
      },
      routes: currentRoutes,
      menuIndex: currentRoutes[0].children[0].name,
      permission: system.dataGet('modules', true)
    }
  },
  methods: {
    closeMenu () {
      bridge.$emit('triggerMenu')
    },
    onMenuSelect (index) {
      this.menuIndex = index
      this.closeMenu()
    },
    subPermissionCheck (item) {
      if (item.children && item.children.length > 0) {
        for (let i = 0; i < item.children.length; i++) {
          if (this.permissionCheck(item.children[i])) {
            return true
          }
        }
      }
      return this.permissionCheck(item)
    },
    permissionCheck (item) {
      if (!item.meta || !item.meta.module) {
        return true
      }
      if (this.permission.indexOf(item.meta.module) === -1) {
        return false
      }
      return true
    },
    indexCalc (item) {
      if (!item.children && item.name) {
        return item.name
      } else if (item.children && item.children.length === 1 && item.children[0].name) {
        return item.children[0].name
      } else {
        return item.path
      }
    },
    // 这里主要只靠这个地方来做判断。确定是否显隐菜单
    menuHiddenCheck (item) {
      if (item.meta) {
        // do something check
      }
      if (!item.meta || (item.meta && !item.meta.module && !item.meta.hidden)) {
        return false
      }
      if (this.permission.indexOf(item.meta.module) === -1 || item.meta.hidden) {
        return true
      }
      return false
    },
    routerCalcer () {
      let _self = this
      function ItemCalc (item) {
        if (item.constructor !== Array) {
          item = [item]
        }
        let ret = { h: true, d: true }
        for (let i = 0; i < item.length; i++) {
          if (item[i].children) {
            let subRet = ItemCalc(item[i].children)
            item[i].h = subRet.h
            item[i].d = subRet.d
            if (!subRet.h) {
              ret.h = subRet.h
              ret.d = subRet.d
            }
          } else {
            item[i].h = _self.menuHiddenCheck(item[i])
            if (!item[i].h) {
              ret.h = item[i].h
              ret.d = item[i].d
            }
          }
        }
        return ret
      }
      ItemCalc(this.routes)
      this.routes = JSON.parse(JSON.stringify(this.routes))
      this.routes = this.routes
    }
  },
  watch: {
    sys: {
      handler () {
        this.showMenu = false
        this.reload = false
        this.$nextTick(() => {
          this.reload = true
        })
      },
      deep: true
    },
    '$route': {
      handler () {
        this.menuIndex = this.$route.name
        this.routerCalcer()
      },
      deep: true
    },
    menuIndex (val) {
      if (val === this.$route.name) {
        return false
      }
      // console.log(val)
      val = val || 'default'
      this.$router.push({
        name: val.replace('/', '')
      })
    }
  },
  mounted () {
    let _self = this
    this.menuIndex = this.$route.name
    bridge.$on('triggerMenu', () => {
      this.showMenu = !this.showMenu
    })
    // subFn ======
    this.routerCalcer()
  }
}
</script>

<style lang="scss" scoped>
.nav-menu-countainer {
  z-index: 10;
  position: fixed;
  left: 0px;
  top: 44px;
  width: 100%;
  height: 46px;
  border-bottom: 1px solid #eee !important;
  overflow: hidden;
  border: none;
  &.pageMini {
    z-index: 999;
    left: -200px;
    top: 0px;
    width: 200px;
    height: 100vh;
    text-align: left;
    transition: .2s;
    box-sizing: border-box;
    &.show {
      transform: translateX(100%);
      & + .nav-menu-mark {
        transform: translateX(-100%);
      }
    }
  }
  /*&.hasSuffixId {*/
    /*&>*:nth-child(99999),&>*:nth-child(1),&>*:nth-child(2) {*/
      /*display: none !important;*/
    /*}*/
  /*}*/
  /*&.noSuffixId {*/
    /*&>*:nth-child(n+3) {*/
      /*display: none !important;*/
    /*}*/
  /*}*/
}
.nav-menu-mark {
  z-index: 998;
  position: fixed;
  top: 0px;
  right: -100%;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  transition: .2s;
}
@media only screen and (min-width: 100px) and (max-width: 640px) {
  .nav-menu-countainer {
    overflow-y: scroll;
    .el-submenu {
      height: auto !important;
    }
  }
  .nav-menu-countainer::-webkit-scrollbar {
    display: none !important;
  }
}
</style>

<style>
.el-menu-item,.el-submenu__title,.el-submenu {
  height: 46px !important;
  line-height: 46px !important;
  box-sizing: border-box !important;
}
</style>
