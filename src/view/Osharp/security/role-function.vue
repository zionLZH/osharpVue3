<template>
  <div class="root">
    <magnetic :style="'padding: 0px;height: calc(100vh - 125px);overflow:hidden;'">
      <div class="com-tree-box" @mouseup="onBarMover" @mouseleave="barMove=false">
        <div class="left" v-loading="zTreeLoading" element-loading-text="数据正在加载中">
          <div class="fnBar">
            <el-button size="small" type="primary" icon="el-icon-refresh" @click="getZtree">刷新</el-button>
          </div>
          <div class="scroll" style="height: calc(100% - 52px)">
            <el-tree class="tree" highlight-current default-expand-all :data="zTree" @node-click="onZtreeNodeClick">
              <div class="tree-node" style="width: 100%" slot-scope="{ node, data }">
                <el-row>
                  <el-col :span="4">{{data.Id}}</el-col>
                  <el-col :span="5">{{data.Name}}</el-col>
                  <el-col :span="9">{{data.Remark}}</el-col>
                  <el-col :span="6">{{data.IsAdmin}}</el-col>
                </el-row>
              </div>
            </el-tree>
          </div>
        </div>
        <div class="bar" @mousedown="barMove = true"></div>
        <div class="right" v-loading="pTreeLoading" element-loading-text="数据正在加载中">
          <div class="fnBar">
            <el-button size="small" type="primary" icon="el-icon-refresh" :disabled="!pTreeId" @click="getPtree">刷新</el-button>
          </div>
          <div class="scroll" style="height: calc(100% - 52px)">
            <el-tree class="tree" highlight-current default-expand-all :data="pTree">
              <div class="tree-node" slot-scope="{ node, data }">
                <el-row>
                  <el-col :span="8">{{data.Name}}</el-col>
                  <el-col :span="4">{{['匿名访问','登陆访问','角色访问'][data.AccessType] || data.AccessType}}</el-col>
                  <el-col :span="6">{{data.Area}}</el-col>
                  <el-col :span="6">{{data.Controller}}</el-col>
                </el-row>
              </div>
            </el-tree>
          </div>
        </div>
      </div>
    </magnetic>
  </div>
</template>

<script>
import * as apiRolefunction from '@/api/osharp/Rolefunction'

export default {
  components: {
    magnetic: () => import('@/components/other/magnetic')
  },
  data () {
    return {
      barMove: false,
      zTree: [],
      zTreeLoading: false,
      pTree: [],
      pTreeId: '',
      pTreeLoading: false
    }
  },
  methods: {
    onBarMover (e) {
      if (!this.barMove) {
        return
      }
      document.querySelector('.com-tree-box>.left').style.width = e.layerX - 4 + 'px'
      document.querySelector('.com-tree-box>.right').style.width = `calc(100% - ${e.layerX + 4}px)`
      this.barMove = false
    },
    getZtree () {
      this.zTreeLoading = true
      apiRolefunction.Read({
        PageCondition: {
          PageIndex: 1,
          PageSize: 5000,
          SortConditions: []
        },
        FilterGroup: {
          Rules: [],
          Operate: 1,
          Groups: [],
          Level: 1
        }
      }).then(res => {
        this.zTree = [{
          Id: 'Id',
          Name: '名称',
          Remark: '备注',
          IsAdmin: '管理',
          children: res.data.Rows
        }]
        this.zTreeLoading = false
      }).catch(e => {
        this.zTreeLoading = false
        this.$message({
          type: 'error',
          message: e.response.data.Content
        })
      })
    },
    getPtree () {
      this.pTreeLoading = true
      apiRolefunction.Readfunctions({ roleId: this.pTreeId }, {
        PageCondition: {
          PageIndex: 1,
          PageSize: 5000,
          SortConditions: []
        },
        FilterGroup: {
          Rules: [],
          Operate: 1,
          Groups: [],
          Level: 1
        }
      }).then(res => {
        this.pTree = [{
          Name: '功能名称',
          AccessType: '功能类型',
          Area: 'Area',
          Controller: 'Controller',
          children: res.data.Rows
        }]
        this.pTreeLoading = false
      }).catch(e => {
        this.pTreeLoading = false
        this.$message({
          type: 'error',
          message: e.response.data.Content
        })
      })
    },
    onZtreeNodeClick (item) {
      this.pTreeId = item.Id
      this.getPtree()
    }
  },
  mounted () {
    this.getZtree()
  }
}
</script>

<style lang="scss" scoped>
@import "style/treeBox";
</style>
