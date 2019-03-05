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
        @sort-change="onSortChange"
        v-loading="tableLoading"
        element-loading-text="数据正在加载中">
        <template slot="method" slot-scope="item">
          <el-button size="small" type="primary" @click="doLock(item.data)">{{item.data.IsLocked?'解锁':'锁定'}}</el-button>
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
import * as apiUserRole from '@/api/osharp/User-role'
import columnList from './column/user-role'

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
      poproleInfoPayload: {},
      poproleInfo: false,
      poproleConfig: false
    }
  },
  methods: {
    // 获取列表
    getList () {
      this.tableLoading = true
      apiUserRole.Read({
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
    // 锁定用户角色
    doLock (item) {
      this.$confirm('是否' + (item.IsLocked ? '解锁' : '锁定') + '该用户角色？', '提示', {
        type: 'wraning'
      }).then(e => {
        item.IsLocked = !item.IsLocked
        apiUserRole.Update([item]).then(res => {
          res = res.data
          this.$message({
            type: res.Type === 200 ? 'success' : 'error',
            message: res.Content
          })
          if (res.Type === 200) {
            this.getList()
          } else {
            item.IsLocked = !item.IsLocked
          }
        }).catch(e => {
          this.$message({
            type: 'error',
            message: e.response.data.Content
          })
        })
      }).catch(e => {})
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
