<template>
  <el-dialog
    custom-class="gee-clear-dialog"
    title="角色信息"
    width="600px"
    :visible.sync="showSelf"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <!--Body-->
    <g-form ref="form" status-icon :model="form">
      <g-item label="角色名" prop="Name" required>
        <el-input v-model="form.Name"></el-input>
      </g-item>
      <g-item label="备注" prop="Remark" required>
        <el-input v-model="form.Remark"></el-input>
      </g-item>
      <g-item label="管理" prop="IsAdmin">
        <el-switch v-model="form.IsAdmin"></el-switch>
      </g-item>
      <g-item label="默认" prop="IsDefault">
        <el-switch v-model="form.IsDefault"></el-switch>
      </g-item>
      <g-item label="锁定" prop="IsLocked">
        <el-switch v-model="form.IsLocked"></el-switch>
      </g-item>
      <g-item label="注册时间" prop="CreatedTime">
        <span v-text="form.CreatedTime"></span>
      </g-item>
      <g-item>
        <el-button type="primary" @click="doSave">保 存</el-button>
        <el-button @click="showSelf=false">取 消</el-button>
      </g-item>
    </g-form>
  </el-dialog>
</template>

<script>
import * as apiRole from '@/api/osharp/Role'

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
        Name: '',
        Remark: '',
        IsAdmin: false,
        IsDefault: false,
        IsLocked: false,
        CreatedTime: '',
        Updatable: false,
        Deletable: false
      }
    }
  },
  methods: {
    doSave () {
      this.$refs.form.validate(ret => {
        if (!ret) {
          return
        }
        if (this.form.Id === 0) {
          // 新增
          apiRole.Create([this.form]).then(res => {
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
          apiRole.Update([this.form]).then(res => {
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
    }
  }
}
</script>

<style lang="scss">
@import "@/components/style/dialogClear.scss"
</style>
