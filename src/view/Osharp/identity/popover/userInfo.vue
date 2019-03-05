<template>
  <el-dialog
    custom-class="gee-clear-dialog"
    title="用户信息"
    width="600px"
    :visible.sync="showSelf"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <!--Body-->
    <g-form ref="form" status-icon :model="form">
      <g-item label="用户名" prop="UserName" required>
        <el-input v-model="form.UserName"></el-input>
      </g-item>
      <g-item label="昵称" prop="NickName" required>
        <el-input v-model="form.NickName"></el-input>
      </g-item>
      <g-item label="密码" prop="Password">
        <el-input type="password" v-model="form.Password"></el-input>
      </g-item>
      <g-item label="邮箱" prop="Email" required>
        <el-input v-model="form.Email"></el-input>
      </g-item>
      <!--<g-item label="确认邮箱" prop="EmailConfirmed">-->
        <!--<el-switch disabled v-model="form.EmailConfirmed"></el-switch>-->
      <!--</g-item>-->
      <g-item label="手机号码" prop="PhoneNumber" checker="phone" required>
        <el-input v-model="form.PhoneNumber"></el-input>
      </g-item>
      <!--<g-item label="登陆锁" prop="LockoutEnabled">-->
        <!--<el-switch disabled v-model="form.LockoutEnabled"></el-switch>-->
      <!--</g-item>-->
      <g-item label="是否锁定" prop="IsLocked">
        <el-switch v-model="form.IsLocked"></el-switch>
      </g-item>
      <g-item>
        <el-button type="primary" @click="doSave">保 存</el-button>
        <el-button @click="showSelf=false">取 消</el-button>
      </g-item>
    </g-form>
  </el-dialog>
</template>

<script>
import * as apiUser from '@/api/osharp/User'

export default {
  components: {
    gForm: () => import('@/components/form/form'),
    gItem: () => import('@/components/form/item')
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    payload: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showSelf: this.visible,
      form: {
        Id: 0,
        UserName: '',
        NickName: '',
        Password: '',
        Email: '',
        EmailConfirmed: true,
        PhoneNumber: '',
        PhoneNumberConfirmed: false,
        LockoutEnabled: false,
        IsLocked: false
      }
    }
  },
  methods: {
    doSave () {
      this.$refs.form.validate(ret => {
        if (!ret) {
          return
        }
        if (this.form.Password.length < 6) {
          this.$message.error('密码最小长度为6位数')
          return false
        }
        if (this.form.Id === 0) {
          // 新增
          apiUser.Create([this.form]).then(res => {
            res = res.data
            this.$message({
              type: res.Type === 200 ? 'success' : 'error',
              message: res.Content
            })
            this.$emit('close')
            this.showSelf = res.Type !== 200
          }).catch(e => {
            this.$message({
              type: 'error',
              message: e.response.data.Content
            })
          })
        } else {
          // 修改
          apiUser.Update([this.form]).then(res => {
            res = res.data
            this.$message({
              type: res.Type === 200 ? 'success' : 'error',
              message: res.Content
            })
            this.$emit('close')
            this.showSelf = res.Type !== 200
          }).catch(e => {
            this.$message({
              type: 'error',
              message: e.response.data.Content
            })
          })
        }
      })
    }
  },
  watch: {
    showSelf () {
      this.$emit('update:visible', this.showSelf)
    }
  },
  mounted () {
    if (this.payload && this.payload.Id) {
      for (let key in this.form) {
        this.form[key] = this.payload[key]
      }
      this.form.EmailConfirmed = true
    }
  }
}
</script>

<style lang="scss">
@import "@/components/style/dialogClear.scss"
</style>
