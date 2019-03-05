<template>
  <el-dialog
    custom-class="gee-clear-dialog"
    title="功能信息"
    width="600px"
    :visible.sync="showSelf"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <!--Body-->
    <g-form ref="form" status-icon :model="form">
      <g-item label="功能名称" prop="AccessType">
        <el-select v-model="form.AccessType">
          <el-option label="匿名访问" :value="0"></el-option>
          <el-option label="登陆访问" :value="1"></el-option>
          <el-option label="角色访问" :value="2"></el-option>
        </el-select>
      </g-item>
      <g-item label="缓存秒数" prop="CacheExpirationSeconds">
        <el-input-number v-model="form.CacheExpirationSeconds" :min="0"></el-input-number>
      </g-item>
      <g-item label="操作审计" prop="AuditOperationEnabled">
        <el-switch v-model="form.AuditOperationEnabled"></el-switch>
      </g-item>
      <g-item label="数据审计" prop="AuditEntityEnabled">
        <el-switch v-model="form.AuditEntityEnabled"></el-switch>
      </g-item>
      <g-item label="滑动过期" prop="IsCacheSliding">
        <el-switch v-model="form.IsCacheSliding"></el-switch>
      </g-item>
      <g-item label="已锁定" prop="IsLocked">
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
import * as apiFunction from '@/api/osharp/Function'

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
        AccessType: 0,
        CacheExpirationSeconds: 0,
        AuditOperationEnabled: false,
        AuditEntityEnabled: false,
        IsCacheSliding: false,
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
        apiFunction.Update([this.form]).then(res => {
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
    }
  }
}
</script>

<style lang="scss">
@import "@/components/style/dialogClear.scss"
</style>
