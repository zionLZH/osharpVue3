<template>
  <el-dialog
    custom-class="gee-clear-dialog"
    title="用户信息"
    width="500px"
    :visible.sync="showSelf"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <!--Body-->
    <el-tabs v-model="tab">
      <el-tab-pane label="角色设置" name="role">
        <div class="overflow">
          <div v-for="(item,index) in userRoles" :key="index">
            <el-checkbox size="small" v-model="item.IsChecked" :label="item.Name"></el-checkbox>
          </div>
        </div>
        <div align="right">
          <el-button size="small" type="primary" @click="saveUserRole">保 存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="模块设置" name="module">
        <div class="overflow">
          <el-tree
            ref="tree"
            node-key="Id"
            :data="userModules"
            show-checkbox
            default-expand-all>
          </el-tree>
        </div>
        <div align="right">
          <el-button size="small" type="primary" @click="saveUserModule">保 存</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import * as apiUser from '@/api/osharp/User'
import * as apiRole from '@/api/osharp/Role'
import * as apiModule from '@/api/osharp/Module'

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
      tab: 'role',
      userRoles: [],
      userModules: []
    }
  },
  methods: {
    // 保存用户角色
    saveUserRole () {
      let arr = []
      for (let i = 0; i < this.userRoles.length; i++) {
        if (this.userRoles[i].IsChecked) {
          arr.push(this.userRoles[i].Id)
        }
      }
      apiUser.setroles({
        userId: this.payload.Id,
        roleIds: arr
      }).then(res => {
        res = res.data
        this.$message({
          type: res.Type === 200 ? 'success' : 'error',
          message: res.Content
        })
        this.$emit('close')
        this.showSelf = !res.Type === 200
      }).catch(e => {
        this.$message({
          type: 'error',
          message: e.response.data.Content
        })
      })
    },
    // 保存用户模块
    saveUserModule () {
      let checks = this.$refs.tree.getCheckedNodes()
      let arr = []
      for (let i = 0; i < checks.length; i++) {
        arr.push(checks[i].Id)
      }
      apiUser.setmodules({
        userId: this.payload.Id,
        moduleIds: arr
      }).then(res => {
        res = res.data
        this.$message({
          type: res.Type === 200 ? 'success' : 'error',
          message: res.Content
        })
        this.$emit('close')
        this.showSelf = !res.Type === 200
      }).catch(e => {
        this.$message({
          type: 'error',
          message: e.response.data.Content
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
    if (!this.payload.Id) {
      this.$message('获取用户信息失败')
      return
    }
    // 获取用户角色
    apiRole.ReadUserRoles({
      userId: this.payload.Id
    }).then(res => {
      this.userRoles = res.data
    }).catch(e => {
      this.$message({
        type: 'error',
        message: e.response.data.Content
      })
    })
    // 获取用户模块
    apiModule.ReadUserModules({
      userId: this.payload.Id
    }).then(res => {
      // 格式化
      res = res.data
      res = JSON.parse(JSON.stringify(res).replace(/"Items"/gi, '"children"').replace(/"Name"/gi, '"label"'))
      this.userModules = res
      let matchs = JSON.stringify(res).match(/"Id":(.*?),"IsChecked":true/g) || []
      let checks = []
      if (matchs.length === 0) {
        return
      }
      for (let i = 0; i < matchs.length; i++) {
        try {
          checks.push(JSON.parse('{' + matchs[i] + '}').Id)
        } catch (e) {
          // nothing
        }
      }
      this.$refs.tree.setCheckedKeys(checks)
    }).catch(e => {
      console.error(e)
      this.$message({
        type: 'error',
        message: e.response.data.Content
      })
    })
  }
}
</script>

<style lang="scss">
@import "@/components/style/dialogClear.scss"
</style>

<style lang="scss" sopced>
.overflow {
  width: 100%;
  height: 50vh;
  overflow: scroll;
}
</style>
