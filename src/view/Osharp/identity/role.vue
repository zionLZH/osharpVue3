<template>
  <div class="root">
    <magnetic>
      <el-button size="small" icon="el-icon-refresh" @click="getList">刷新</el-button>
      <el-button size="small" icon="el-icon-plus" @click="poproleInfoPayload={};poproleInfo=true">新增</el-button>
    </magnetic>
    <magnetic>
      <!--Table-->
      <g-table
        :table.sync="table"
        :columns="tableColumn"
        :selection="false"
        :selection-arr.sync="selections"
        method-width="180px"
        @sort-change="onSortChange"
        v-loading="tableLoading"
        element-loading-text="数据正在加载中">
        <template slot="method" slot-scope="item">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="toDetail(item.data)"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="doRemove(item.data)"></el-button>
          <el-button size="mini" icon="el-icon-more" @click="toroleConfig(item.data)"></el-button>
        </template>
      </g-table>
      <!--Pager-->
      <el-pagination
        :current-page.sync="pageIndex"
        :page-sizes="[10, 15, 30, 50]"
        :page-size="pageSize"
        @size-change="pageSize=$event"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        prev-text="上一页"
        next-text="下一页"
        :total="pageTotal">
      </el-pagination>
      <!--角色弹窗-->
      <role-info
        v-if="poproleInfo"
        :visible.sync="poproleInfo"
        :payload="poproleInfoPayload"
        @close="getList">
      </role-info>
      <!--用户配置弹窗-->
      <role-config
        v-if="poproleConfig"
        :visible.sync="poproleConfig"
        :payload="poproleInfoPayload"
        @close="getList">
      </role-config>
    </magnetic>
  </div>
</template>

<script>
import * as apiRole from '@/api/osharp/Role'
import columnList from './column/role'

export default {
  components: {
    magnetic: () => import('@/components/other/magnetic'),
    gTable: () => import('@/components/table/table'),
    roleInfo: () => import('./popover/roleInfo'),
    roleConfig: () => import('./popover/roleConfig')
  },
  data () {
    return {
      pageSize: 10,
      pageIndex: 1,
      pageTotal: 99999,
      table: [],
      tableColumn: columnList,
      tableSort: {},
      tableLoading: false,
      selections: [],
      poproleInfoPayload: {},
      poproleInfo: false,
      poproleConfig: false
    }
  },
  methods: {
    // 获取列表
    getList () {
      this.tableLoading = true
      apiRole.Read({
        PageCondition: {
          PageIndex: this.pageIndex,
          PageSize: this.pageSize
        },
        SortConditions: !this.tableSort.SortField ? [] : [this.tableSort]
      }).then(res => {
        res = res.data
        this.table = res.Rows
        this.pageTotal = res.Total
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        this.$message({
          type: 'error',
          message: e.response.data.Message || e.response.data.Content || '请求失败'
        })
      })
    },
    // 列表排序
    onSortChange (c) {
      if (typeof c.order !== 'number') {
        this.tableSort = {}
      } else {
        this.tableSort = {
          SortField: c.prop,
          ListSortDirection: c.order
        }
      }
      this.getList()
    },
    // 详情
    toDetail (item) {
      this.poproleInfoPayload = item
      this.poproleInfo = true
    },
    // 删除
    doRemove (item) {
      this.$confirm('是否删除该数据？', '提示', {
        type: 'wraning'
      }).then(e => {
        apiRole.Delete([item.Id]).then(res => {
          res = res.data
          this.$message({
            type: res.Type === 200 ? 'success' : 'error',
            message: res.Content
          })
          if (res.Type === 200) {
            this.getList()
          }
        }).catch(e => {
          this.$message({
            type: 'error',
            message: e.response.data.Content
          })
        })
      }).catch(e => {})
    },
    // 用户配置
    toroleConfig (item) {
      this.poproleInfoPayload = item
      this.poproleConfig = true
    }
  },
  watch: {
    pageSize () {
      this.$router.replace({
        name: this.$route.name,
        query: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      })
      this.getList()
    },
    pageIndex () {
      this.$router.replace({
        name: this.$route.name,
        query: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      })
      this.getList()
    }
  },
  mounted () {
    if (this.$route.query.pageSize) {
      this.pageSize = parseInt(this.$route.query.pageSize)
    }
    if (this.$route.query.pageIndex) {
      this.pageIndex = parseInt(this.$route.query.pageIndex)
    }
    this.getList()
  }
}
</script>

<style scoped>
</style>
