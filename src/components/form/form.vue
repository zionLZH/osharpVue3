<template>
  <el-form
    class="gee-com-form-body"
    ref="form"
    size="smal"
    :model="omodel"
    :rules="orules"
    :disabled="odisabled"
    :label-width="olabelWidth"
    :label-position="sys.onMobile?'top':olabelPosition"
    :style="{'max-width': maxWidth}"
    :status-icon="statusIcon"
    >
    <slot></slot>
  </el-form>
</template>

<script>
import { Consts } from '@/utils/system'
var sysConsts = new Consts()

export default {
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    labelWidth: {
      type: String,
      default: '160px'
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    maxWidth: {
      type: String,
      default: '900px'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    entity: {
      type: Object,
      default: () => {
        return {}
      }
    },
    statusIcon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      omodel: this.model,
      olabelWidth: this.labelWidth,
      olabelPosition: this.labelPosition,
      odisabled: this.disabled,
      orules: this.rules,
      sys: sysConsts
    }
  },
  methods: {
    validate (CB) {
      this.$refs.form.validate(CB)
    },
    resetFields () {
      this.$refs.form.resetFields()
    },
    validateField (a, b) {
      this.$refs.form.validateField(a, b)
    },
    clearValidate () {
      this.$refs.form.clearValidate()
    }
  }
}
</script>

<style scoped>
.gee-com-form-body {
  max-width: 700px;
}
</style>
