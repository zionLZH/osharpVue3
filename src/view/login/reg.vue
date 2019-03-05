<template>
  <div class="login-background">
    <div class="logo-container" v-loading="loading">
      <div class="title">注册</div>
      <g-form ref="form" status-icon :model="form" label-width="0px">
        <g-item prop="username" checker="noEmpty" checkmsg="请输入账号">
          <el-input
            size="medium"
            placeholder="请输入账号"
            v-model="form.username"></el-input>
        </g-item>
        <g-item prop="password" checker="password" checkmsg="请输入密码，6位数字+字母">
          <el-input
            size="medium"
            placeholder="请输入密码"
            type="password"
            v-model="form.password"></el-input>
        </g-item>
        <g-item prop="passwordConfirm" contrast="password" err="密码不一致">
          <el-input
            size="medium"
            placeholder="请重复密码"
            type="password"
            v-model="form.passwordConfirm"></el-input>
        </g-item>
        <g-item prop="nick" checker="noEmpty" checkmsg="请输入昵称">
          <el-input
            size="medium"
            placeholder="请输入昵称"
            v-model="form.nick"></el-input>
        </g-item>
        <g-item prop="mail" checker="mail" checkmsg="请输入邮箱">
          <el-input
            size="medium"
            placeholder="请输入邮箱"
            v-model="form.mail"></el-input>
        </g-item>
        <g-item prop="vcode" checker="noEmpty" checkmsg="请输入验证码">
          <el-input
            size="medium"
            placeholder="验证码"
            style="width: 180px"
            v-model="form.vcode"></el-input>
          <img style="float: right;" :src="form.vcodeImg" alt="验证码无法加载" @click="refreshVcode"/>
        </g-item>
      </g-form>
      <el-button class="button" @click="doReg">注 册</el-button>
    </div>
  </div>
</template>

<script>
import * as apiCommon from '@/api/osharp/Common'
import * as apiIdentity from '@/api/osharp/Identity'

export default {
  components: {
    gForm: () => import('@/components/form/form'),
    gItem: () => import('@/components/form/item')
  },
  data () {
    return {
      form: {
        username: '',
        password: '',
        passwordConfirm: '',
        nick: '',
        mail: '',
        vcode: '',
        vcodeId: '',
        vcodeImg: ''
      },
      loading: false
    }
  },
  methods: {
    refreshVcode () {
      apiCommon.VerifyCode().then(res => {
        if (!res.vcode && !res.vcodeId) {
          this.$message({
            type: 'error',
            message: res.res.data.Content
          })
          return false
        }
        this.form.vcodeImg = res.vcode
        this.form.vcodeId = res.vcodeId
      }).catch(e => {
        console.log(e)
        this.$message({
          type: 'error',
          message: e.response.data.Content
        })
      })
    },
    doReg () {
      this.$refs.form.validate(ret => {
        if (!ret) {
          return
        }
        this.loading = true
        apiIdentity.Register({
          UserName: this.form.username,
          Password: this.form.password,
          ConfirmPassword: this.form.passwordConfirm,
          NickName: this.form.nick,
          Email: this.form.mail,
          VerifyCode: this.form.vcode,
          VerifyCodeId: this.form.vcodeId
        }).then(res => {
          if (res.data && res.data.Type && res.data.Type !== 200) {
            this.loading = false
            this.$message({
              type: 'error',
              message: res.data.Content
            })
            return false
          }
          this.$message({
            type: 'success',
            message: '注册成功'
          })
          setTimeout(() => {
            this.$router.push({
              name: 'login'
            })
          }, 2000)
        }).catch(e => {
          this.loading = false
          this.$message({
            type: 'error',
            message: e.response.data.Content
          })
        })
      })
    }
  },
  mounted () {
    this.refreshVcode()
  }
}
</script>

<style lang="scss" scoped>
.login-background {
  width: 100vw;
  height: 100vh;
  background-color: #343539;
  overflow: hidden;
  .logo-container {
    width: 100%;
    max-width: 300px;
    margin: 15vh auto 0px auto;
    color: #fff;
    .title {
      max-width: 100%;
      padding: 15px 0px;
      margin-bottom: 20px;
      font-size: 28px;
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

<style>
  .logo-container .el-input input {
    color: #fafafa;
    border: 1px solid #666;
    background-color: #222;
  }
  .logo-container .el-input input:focus {
    border: 1px solid #18a15f;
  }
</style>
