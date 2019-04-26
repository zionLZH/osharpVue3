<template>
  <div class="login-background">
    <div class="top">
      <div class="content">
        系统登陆
      </div>
    </div>
    <div class="mid">
      <div class="content">
        <div class="ad-container">
        </div>
        <div class="logo-container" v-loading="loading">
          <div class="title">系统登陆</div>
          <g-form ref="form" status-icon label-width="0px" :model="form">
            <g-item prop="username" checker="noEmpty" checkmsg="请正确输入账号">
              <el-input
                clearable
                size="medium"
                placeholder="请输入账号"
                prefix-icon="el-icon-g-user-clear"
                v-model="form.username"/>
            </g-item>
            <g-item prop="password" checker="noEmpty" checkmsg="请正确输入密码">
              <el-input
                clearable
                size="medium"
                type="password"
                placeholder="请输入密码"
                prefix-icon="el-icon-g-password-clear"
                v-model="form.password"/>
            </g-item>
          </g-form>
          <el-button class="button" @click="doLogin">登 录</el-button>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import * as system from '@/utils/system'
import * as apiIdentity from '@/api/osharp/Identity'
import * as apiSecurity from '@/api/osharp/Security'

export default {
  components: {
    gForm: () => import('@/components/form/form'),
    gItem: () => import('@/components/form/item')
  },
  data () {
    return {
      form: {
        username: 'admin',
        password: 'gmf31529019'
      },
      loading: false
    }
  },
  methods: {
    doLogin () {
      this.$refs.form.validate(async ret => {
        if (!ret) {
          return false
        }
        this.loading = true
        try {
          let res = await apiIdentity.Jwtoken({
            Account: this.form.username,
            Password: this.form.password,
            Remember: true
          })
          res = res.data
          if (res.Type !== 200) {
            let err = {response: {data: res}}
            throw err
          }
          system.dataSet('auth', res.Data, true)
          res = await apiSecurity.getauthinfo()
          res = res.data
          if (res.constructor !== Array) {
            let err = {response: {data: res}}
            throw err
          }
          system.dataSet('modules', res, true)
          window.vModuleArr = res
          this.loading = false
          this.$message({
            type: 'success',
            message: '登陆成功'
          })
          this.$router.replace('/')
        } catch (e) {
          // console.error(e)
          console.error(e)
          this.$message.error(e.response.data.Message || e.response.data.Content || '请求失败')
          system.dataRemove('auth', true)
          system.dataRemove('modules', true)
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-background {
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
  overflow: hidden;
  .top {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    .content {
      max-width: 1024px;
      margin: 0px auto;
      padding-left: 15px;
    }
  }
  .mid {
    position: fixed;
    top: 80px;
    width: 100%;
    height: 300px;
    background-color: #16a05d;
    .content {
      max-width: 1024px;
      margin: 0px auto;
      height: 300px;
    }
    .logo-container {
      float: right;
      padding: 30px 20px;
      height: 300px;
      margin-right: 15px;
      background-color: rgba(255,255,255,0.7);
    }
    .ad-container {
      float: left;
      margin-left: 15px;
      padding: 20px 0px;
      color: #fff;
      line-height: 2;
      font-size: 20px;
    }
  }
  .bottom {
    position: fixed;
    top: 380px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    padding-top: 40px;
    .content {
      max-width: 1024px;
      margin: 0px auto;
      height: 300px;
      .item {
        height: 120px;
        &:after {
          content: '';
          display: table;
          clear: both;
        }
        .icon {
          float: left;
          width: 60px;
          height: 60px;
          margin-top: 10px;
          margin-right: 15px;
        }
        .val {
          float: left;
          line-height: 1.2;
          max-width: 80%;
          color: #888;
          h3 {
            font-size: 18px;
            line-height: 1;
            font-weight: bold;
            margin-bottom: 8px;
            color: #333;
          }
        }
      }
    }
  }
  .logo-container {
    width: 100%;
    max-width: 300px;
    text-align: center;
    /*margin: 15vh auto 0px auto;*/
    /*color: #fff;*/
    .title {
      max-width: 100%;
      padding: 15px 0px;
      margin-bottom: 20px;
      font-size: 20px;
      word-break: break-all;
      text-align: center;
    }
    .button {
      width: 100%;
      color: #fff;
      text-align: center;
      background-color: #18a15f;
      border: none;
    }
  }
}
</style>
