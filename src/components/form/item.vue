<template>
  <el-form-item
    class="gee-com-form-item"
    size="mini"
    :prop="prop"
    :label="label"
    :required="required"
    :error="error"
    :rules="rule"
    >
    <slot></slot>
  </el-form-item>
</template>

<script>
import check from '@/utils/check'
export default {
  props: {
    prop: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    contrast: {
      type: String,
      default: ''
    },
    err: {
      type: String,
      default: '所填数据不一致'
    },
    checker: {
      default: false
    },
    checkmsg: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      rule: []
    }
  },
  computed: {
    errStr () {
      return this.oerr || this.error
    }
  },
  mounted () {
    var VM = this
    if (this.$parent.model && this.contrast && this.prop) {
      this.rule.push({
        validator (rule, val, callback) {
          if (VM.$parent.model[VM.contrast] === val) {
            callback()
          } else {
            callback(new Error(VM.err))
          }
        },
        trigger: ['blur', 'change']
      })
    }
    // currentVaildator
    if (this.checker && this.$parent.model && this.prop) {
      const presetMsg = '请正确填写数据'
      this.rule.push({
        validator (rule, val, callback) {
          if (typeof VM.checker === 'function') {
            VM.checker(rule, val, callback, VM.checkmsg || presetMsg)
          } else if (check[VM.checker]) {
            if (check[VM.checker](val)) {
              callback()
            } else {
              callback(new Error(VM.checkmsg || presetMsg))
            }
          } else {
            callback(new Error('无法校验数据'))
            console.error('checker:' + VM.checker + 'is no support')
          }
        },
        trigger: ['blur', 'change']
      })
    }
  }
}
</script>

<style lang="scss">
.gee-com-form-item {
  .el-checkbox {
    margin: 0px 30px 0px 0px;
  }
  .el-radio {
    margin: 0px 30px 0px 0px;
  }
}
</style>
