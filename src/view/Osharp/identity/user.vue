<template>
  <div class="root">
    <magnetic>
      <el-button size="small" icon="el-icon-refresh" @click="getList">刷新</el-button>
      <el-button size="small" icon="el-icon-plus" @click="popUserInfoPayload={};popUserInfo=true">新增</el-button>
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
          <el-button size="mini" icon="el-icon-more" @click="toUserConfig(item.data)"></el-button>
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
      <!--用户弹窗-->
      <user-info
        v-if="popUserInfo"
        :visible.sync="popUserInfo"
        :payload="popUserInfoPayload"
        @close="getList">
      </user-info>
      <!--用户配置弹窗-->
      <user-config
        v-if="popUserConfig"
        :visible.sync="popUserConfig"
        :payload="popUserInfoPayload"
        @close="getList">
      </user-config>
    </magnetic>
  </div>
</template>

<script>
import * as apiUser from '@/api/osharp/User'
import columnList from './column/user'

export default {
  components: {
    magnetic: () => import('@/components/other/magnetic'),
    gTable: () => import('@/components/table/table'),
    userInfo: () => import('./popover/userInfo'),
    userConfig: () => import('./popover/userConfig')
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
      apiUser.Read({
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
    // 详情
    toDetail (item) {
      this.popUserInfoPayload = item
      this.popUserInfo = true
    },
    // 删除
    doRemove (item) {
      this.$confirm('是否删除该数据？', '提示', {
        type: 'wraning'
      }).then(e => {
        apiUser.Delete([item.Id]).then(res => {
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
    toUserConfig (item) {
      this.popUserInfoPayload = item
      this.popUserConfig = true
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
