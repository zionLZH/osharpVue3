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
                  <el-col :span="5">{{data.Name}}</el-col>
                  <el-col :span="6">{{data.Code}}</el-col>
                  <el-col :span="9">{{data.Remark}}</el-col>
                  <el-col :span="4">{{data.OrderCode}}</el-col>
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
                  <el-col :span="6">{{data.Area || '无'}}</el-col>
                  <el-col :span="6">{{data.Controller || '无'}}</el-col>
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
import * as apiModule from '@/api/osharp/Module'
import { transformTozTreeFormat } from './utils/utils'

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
      apiModule.Read().then(res => {
        this.zTree = [{
          Name: '名称',
          Remark: '备注',
          Code: '代码',
          OrderCode: '排序',
          children: transformTozTreeFormat(res.data)
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
      apiModule.Readfunctions({
        PageCondition: {
          PageIndex: 1,
          PageSize: 5000,
          SortConditions: []
        },
        FilterGroup: {
          Rules: [
            {
              Field: 'TreePathString',
              Value: `$${this.pTreeId}$`,
              Operate: 11
            }
          ],
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
