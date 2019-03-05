<template>
  <div class="root">
    <magnetic>
      <el-button size="small" icon="el-icon-refresh" @click="getList">刷新</el-button>
    </magnetic>
    <magnetic>
      <!--Table-->
      <g-table
        :table.sync="table"
        :columns="tableColumn"
        :selection="false"
        :selection-arr.sync="selections"
        method-width="140px"
        @sort-change="onSortChange"
        v-loading="tableLoading"
        element-loading-text="数据正在加载中">
        <template slot="method" slot-scope="item">
          <el-switch v-model="item.data.AuditEnabled" @change="doAuditEnabled(item.data)" active-text="数据审计"></el-switch>
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
    </magnetic>
  </div>
</template>

<script>
import * as apiEntityinfo from '@/api/osharp/entityinfo'
import columnList from './column/entityinfo'

export default {
  components: {
    magnetic: () => import('@/components/other/magnetic'),
    gTable: () => import('@/components/table/table')
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
      popUserInfoPayload: {},
      popUserInfo: false,
      popUserConfig: false
    }
  },
  methods: {
    // 获取列表
    getList () {
      this.tableLoading = true
      apiEntityinfo.Read({
        PageCondition: {
          PageIndex: this.pageIndex,
          PageSize: this.pageSize,
          SortConditions: !this.tableSort.SortField ? [] : [this.tableSort]
        }
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
    doAuditEnabled (item) {
      this.tableLoading = true
      apiEntityinfo.Update([item]).then(res => {
        res = res.data
        this.tableLoading = false
        this.$message({
          type: res.Type === 200 ? 'success' : 'error',
          message: res.Content
        })
      }).catch(e => {
        item.AuditEnabled = !item.AuditEnabled
        this.tableLoading = false
        this.$message({
          type: 'error',
          message: e.response.data.Content
        })
      })
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
