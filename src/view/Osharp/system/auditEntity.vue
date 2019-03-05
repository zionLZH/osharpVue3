<template>
  <div class="root">
    <magnetic :style="'padding: 0px;height: calc(100vh - 125px);overflow:hidden;'">
      <div class="com-tree-box" @mouseup="onBarMover" @mouseleave="barMove=false">
        <div class="left" v-loading="zTreeLoading" element-loading-text="数据正在加载中">
          <div class="fnBar">
            <el-button size="small" type="primary" icon="el-icon-refresh" @click="getZtree">刷新</el-button>
          </div>
          <div class="scroll" style="height: calc(100% - 105px)">
            <el-tree class="tree" highlight-current default-expand-all :data="zTree" @node-click="onZtreeNodeClick">
              <div class="tree-node" style="width: 100%" slot-scope="{ node, data }">
                <el-row>
                  <el-col :span="4">{{data.Name}}</el-col>
                  <el-col :span="4">{{data.TypeName}}</el-col>
                  <el-col :span="4">{{data.OperateType}}</el-col>
                  <el-col :span="4">{{data.NickName}}</el-col>
                  <el-col :span="4">{{data.FunctionName}}</el-col>
                  <el-col :span="4">{{data.CreatedTime}}</el-col>
                </el-row>
              </div>
            </el-tree>
          </div>
          <el-pagination
            :current-page.sync="zpageIndex"
            :page-sizes="[10, 15, 30, 50]"
            :page-size.sync="zpageSize"
            :pager-count="5"
            layout="total, prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :total="zpageTotal">
          </el-pagination>
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
                  <el-col :span="8">{{data.DisplayName}}</el-col>
                  <el-col :span="4">{{data.FieldName}}</el-col>
                  <el-col :span="6">{{data.OriginalValue}}</el-col>
                  <el-col :span="6">{{data.NewValue}}</el-col>
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
import * as apiAuditEntity from '@/api/osharp/AuditEntity'

export default {
  components: {
    magnetic: () => import('@/components/other/magnetic')
  },
  data () {
    return {
      barMove: false,
      zTree: [],
      zpageSize: 10,
      zpageIndex: 1,
      zpageTotal: 99999,
      zTreeLoading: false,
      zTreeItem: [],
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
      apiAuditEntity.Read({
        PageCondition: {
          PageIndex: this.zpageIndex,
          PageSize: this.zpageSize,
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
          Name: '实体名称',
          TypeName: '实体类型',
          OperateType: '数据编号',
          NickName: '执行人',
          FunctionName: '所属功能',
          CreatedTime: '执行时间',
          children: res.data.Rows
        }]
        this.zpageTotal = res.data.Total
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
      this.pTree = [{
        DisplayName: '属性名称',
        FieldName: '实体类型',
        OriginalValue: '原始值',
        NewValue: '变更值',
        children: this.zTreeItem.Properties
      }]
    },
    onZtreeNodeClick (item) {
      this.zTreeItem = item
      this.pTreeId = item.Id
      this.getPtree()
    }
  },
  watch: {
    zpageIndex () {
      this.$router.replace({
        name: this.$route.name,
        query: {
          zpageIndex: this.zpageIndex
        }
      })
      this.getZtree()
    }
  },
  mounted () {
    if (this.$route.query.zpageIndex) {
      this.zpageIndex = parseInt(this.$route.query.zpageIndex)
    }
    this.getZtree()
  }
}
</script>

<style lang="scss" scoped>
@import "style/treeBox";
</style>
