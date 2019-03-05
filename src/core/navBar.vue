<template>
  <div class="nav-bar-container" :class="theme">
    <div v-if="sys.pageMini" class="triggerMenu el-icon-menu" @click="triggerMenu"></div>
    <!--Logo-->
    <div class="logo-container pointIt" @click="toIndex">
      <!--<img v-if="true || !isStrLogo" src="../assets/geeAdmin.png" alt="" />-->
      <!-- <span v-else v-text="logo"></span> -->
      <span v-text="'OSharp'"></span>
    </div>
    <!--User-Methods-->
    <div class="method-container">
      <!--<el-popover class="item" popper-class="nav-popover" trigger="hover">-->
        <!--<span>系统设置</span>-->
        <!--<i class="el-icon-setting" slot="reference"></i>-->
      <!--</el-popover>-->
      <!--<el-popover class="item" popper-class="nav-popover" trigger="hover">-->
        <!--<span>切换主题</span>-->
        <!--<i :class="{ 'el-icon-g-night': theme == 'light', 'el-icon-g-light': theme == 'dark'}" slot="reference" @click="changeTheme"></i>-->
      <!--</el-popover>-->
      <el-popover class="item user" popper-class="nav-popover u-method-popover" trigger="hover">
        <ul class="methods">
          <li class="item" @click="toIndex">系统首页</li>
          <li class="item" @click="logout">退出登录</li>
        </ul>
        <span class="u" slot="reference">
          <span class="nick">{{userData.NickName || ''}}</span>
          <img v-if="!userData.HeadImg" class="head" src="../../static/user/head.png" alt="" />
          <img v-else class="head" :src="userData.HeadImg" alt="">
        </span>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { Core, bridge } from '@/core/lib/const'
import * as apiIdentity from '@/api/osharp/Identity'

const gcore = new Core()
export default {
  props: {
    theme: {
      type: String,
      default: 'light'
    },
    logo: {
      type: String,
      default: 'Logo'
    }
  },
  data () {
    return {
      sys: gcore,
      showMenu: false,
      userData: {},
      lawcaseName: ''
    }
  },
  methods: {
    triggerMenu () {
      bridge.$emit('triggerMenu')
    },
    changeTheme () {
      bridge.$emit('triggerTheme')
    },
    toIndex () {
      this.$router.push({
        path: '/'
      })
    },
    logout () {
      apiIdentity.Logout()
      localStorage.clear()
      this.$router.push({
        name: 'login'
      })
    }
  },
  computed: {
    isStrLogo () {
      return !/(\.(png|jpg|jpeg|webp|gif))/gi.test(this.logo)
    }
  },
  async mounted () {
    try {
      let res = await apiIdentity.profile()
      res = res.data
      if (!res.NickName) {
        throw new Error({response: res})
      }
      this.userData = res
    } catch (e) {
      console.error(e)
      this.$message((e.response ? e.response.data.Content : false) || '请求失败')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar-container {
  z-index: 10;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 44px;
  transition: .2s all;
  &:before {
    content: '';
    display: inline-block;
    clear: both;
  }
  .triggerMenu {
    float: left;
    padding-left: 10px;
    font-size: 24px;
    line-height: 44px;
  }
  /* Theme */
  &.light {
    color: #555;
    background-color: #ffffff;
  }
  &.dark {
    color: #fff;
    /*background-color: #17a05d;*/
    background-color: #00aaff;
    /*background-color: #343539;*/
  }
  /* Current Logo */
  .logo-container {
    float: left;
    height: 44px;
    padding: 0px 10px;
    font-size: 24px;
    line-height: 44px;
    &:before {
      content: '';
      display: inline-block;
      clear: both;
    }
    img {
      float: left;
      display: inline-block;
      width: auto;
      height: 28px;
      margin: 8px 0px;
    }
  }
  /* Current User */
 .method-container {
   padding: 0px 10px;
   float: right;
   &:before {
     clear: both;
   }
   &>.item {
     float: left;
     display: inline-flex;
     align-items: center;
     height: 44px;
     padding: 0px 5px;
     cursor: pointer;
     [class^="el-icon-"] {
       line-height: 44px;
       font-size: 20px;
     }
     .u {
       cursor: pointer;
       overflow: hidden;
       height: 44px;
       .nick {
         float: left;
         height: 44px;
         line-height: 44px;
       }
       .head {
         margin: 8px;
         width: 28px;
         height: 28px;
         border-radius: 100%;
       }
     }
   }
 }
}
.u-method-popover {
  .methods {
    list-style: none;
    margin: 0px;
    padding: 0px;
    .item {
      width: 100%;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      &:hover {
        color: #17a05d;
      }
      &:nth-last-child(1) {
        border-top: 1px solid #EEE;
      }
    }
  }
}
</style>

<style>
.nav-popover {
  min-width: 10px !important;
}
</style>
