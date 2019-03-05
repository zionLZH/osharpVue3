<template>
  <div ref="navMenuCountainer" v-if="reload">
    <el-menu
      class="nav-menu-countainer"
      :class="{'pageMini': sys.pageMini, 'show': showMenu, 'hasSuffixId': ifHasSuffixId(), 'noSuffixId': !ifHasSuffixId()}"
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
        v-show="subPermissionCheck(item)"
        v-if="!item.meta || !item.meta.hidden"
        :is="item.children.length == 1? 'el-menu-item':'el-submenu'"
        >
        <template v-if="item.children.length == 1">{{item.children[0].meta.title}}</template>
        <template v-else>
          <template slot="title">{{item.meta.title}}</template>
          <!--<el-menu-item v-for="(subItem, jndex) in item.children" v-if="!subItem.meta || !subItem.meta.hidden" :key="jndex" :index="item.path + '/' + subItem.path">{{subItem.meta.title}}</el-menu-item>-->
          <div
            v-for="(item,index) in item.children"
            :key="index"
            :index="indexCalc(item)"
            v-show="subPermissionCheck(item)"
            v-if="!item.meta || !item.meta.hidden"
            :is="!item.children || item.children.length == 1? 'el-menu-item':'el-submenu'"
          >
            <template v-if="!item.children">{{item.meta.title}}</template>
            <template v-else>
              <template slot="title">{{item.meta.title}}</template>
              <el-menu-item v-for="(subItem, jndex) in item.children" v-show="permissionCheck(subItem)" v-if="!subItem.meta || !subItem.meta.hidden" :key="jndex" :index="indexCalc(subItem)">{{subItem.meta.title}}</el-menu-item>
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
    ifHasSuffixId () {
      if (this.$route.query._suffixId) {
        return true
      }
      return false
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
    this.menuIndex = this.$route.name
    bridge.$on('triggerMenu', () => {
      this.showMenu = !this.showMenu
    })
    // for (let i = 0; i < this.routes.length; i++) {
    //   if (this.routes[i].meta && this.routes[i].meta.module && !this.routes[i].children[i].meta.hidden) {
    //     this.routes[i].meta.hidden = !this.subPermissionCheck(this.routes[i])
    //   }
    //   if (this.routes[i].children && this.routes[i].children.length > 0) {
    //     for (let k = 0; k < this.routes[i].children.length; k++) {
    //       if (this.routes[i].children[k].meta && this.routes[i].children[k].meta.module && !this.routes[i].children[k].meta.hidden) {
    //         this.routes[i].children[k].meta.hidden = !this.permissionCheck(this.routes[i].children[k])
    //       }
    //     }
    //   }
    // }
    this.routes = this.routes
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
