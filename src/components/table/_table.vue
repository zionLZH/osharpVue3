<template>
  <el-table ref="table" stripe border :data="tableCopy" size="small" @selection-change="onSelectionChange" @sort-change="onSortChange" :max-height="maxHeight" :row-class-name="tableRowClassName" @cell-click="cellClick">
    <el-table-column v-if="selection" type="selection"></el-table-column>
    <!--v-if="item.canHide ? !system.onMobile : true"-->
    <el-table-column
      v-for="(item,index) in columns"
      :key="index"
      :label="item.title"
      :sortable="autoSort && item.sort ? true : (item.sort ? 'custom': false)"
      :prop="index"
      v-if="index !== '$highLighThis'"
      :fixed="item.fixed || false"
      :min-width="item.width || 150">
      <div slot-scope="dItem" @click="!atEdit ? (!item.click ? null : item.click($event, dItem.row, $router)) : null">
        <!--查看模式-->
        <template v-if="!atEdit ? true : item.noEdit">
          <template v-if="dataType(dItem.row[index]) == 'string'"><span v-html="item.format ? item.format(dItem.row) : dItem.row[index]"></span></template>
          <template v-if="dataType(dItem.row[index]) == 'boolean'">
            <i v-if="dItem.row[index]" class="el-icon-success" style="font-size: 18px;color: #4b9e65;"></i>
            <i v-else class="el-icon-error" style="font-size: 18px;color: #ca5a4b;"></i>
          </template>
          <template v-if="dataType(dItem.row[index]) == 'array'"><span v-html="item.format ? item.format(dItem.row) : dItem.row[index]"></span></template>
          <template v-if="dataType(dItem.row[index]) == 'object'"><span v-html="item.format ? item.format(dItem.row) : dItem.row[index]"></span></template>
        </template>
        <!--编辑模式-->
        <template v-else>
          <template v-if="dataType(dItem.row[index]) == 'string'">
            <el-input size="mini" v-model="dItem.row[index]"></el-input>
          </template>
          <template v-if="dataType(dItem.row[index]) == 'boolean'">
            <i v-if="dItem.row[index]" class="el-icon-success" style="font-size: 18px;color: #4b9e65;" @click="dItem.row[index] = !dItem.row[index]"></i>
            <i v-else class="el-icon-error" style="font-size: 18px;color: #ca5a4b;" @click="dItem.row[index] = !dItem.row[index]"></i>
          </template>
        </template>
      </div>
    </el-table-column>
    <el-table-column v-if="keepMethod && $scopedSlots.method" :width="methodWidth" :fixed="methodFixed" label="操作">
      <template slot-scope="dItem">
        <slot name="method" :data="dItem.row"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { Consts } from '@/utils/system'
var sysConsts = new Consts()
export default {
  props: {
    table: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Object,
      default: () => {}
    },
    selection: {
      type: Boolean,
      default: false
    },
    atEdit: {
      type: Boolean,
      default: false
    },
    selectionArr: {
      type: Array,
      default: () => []
    },
    keepMethod: {
      type: Boolean,
      default: true
    },
    methodWidth: {
      type: String,
      default: '110px'
    },
    methodFixed: {
      type: String,
      default: 'right'
    },
    maxHeight: {
      default: 'auto'
    },
    remain: {
      default: 36
    },
    remainHeight: {
      default: 75
    },
    hightLightSame: {
      type: Boolean,
      default: true
    },
    autoSort: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      system: sysConsts,
      tableCopy: [],
      contentWrapper: null,
      fitWrapper: null,
      hightLightKey: '',
      hightLightVal: '',
      contentBottom: 0,
      presetHeight: 500,
      initTableData: (this.table && this.table.length !== 0) ? this.table : false
    }
  },
  methods: {
    dataType (val) {
      if (typeof val === 'string' || typeof val === 'number') {
        return 'string'
      }
      if (typeof val === 'boolean') {
        return 'boolean'
      }
      try {
        if (val.constructor === Array) {
          return 'array'
        }
      } catch (e) {
        // nothing
      }
      if (typeof val === 'object') {
        return 'object'
      }
      return 'string'
    },
    onSelectionChange (c) {
      this.$emit('update:selectionArr', c)
    },
    onSortChange (c) {
      // 在这里由于系统的特殊性，做一个编码处理了
      let orderMap = {
        ascending: 0,
        descending: 1
      }
      c.order = orderMap[c.order]

      this.$emit('sort-change', c)
    },
    clearSelection () {
      this.$refs.table.clearSelection()
    },
    toggleRowSelection (row, selected) {
      this.$refs.table.toggleRowSelection(row, selected)
    },
    doLayout () {
      this.$refs.table.doLayout()
    },
    tableRowClassName (data) {
      if (!this.hightLightSame) {
        return ''
      }
      let row = data.row
      if (row[this.hightLightKey] === this.hightLightVal) {
        return 'el-table__hight-same'
      } else if (row.$highLighThis) {
        return 'el-table__hight-self'
      } else {
        return ''
      }
    },
    cellClick (row, column, cell) {
      if (!this.hightLightSame || column.fixed || column.property.indexOf('z_') !== -1) {
        return false
      }
      this.hightLightKey = column.property
      this.hightLightVal = row[column.property]
    },
    scrollHandler (e) {
      if (this.table.length <= 30 || this.maxHeight === 'auto') {
        return
      }
      let target = e.srcElement || e.target
      let i = target.scrollTop / this.remainHeight
      if (i + this.remain >= this.table.length) {
        this.contentWrapper.style.paddingBottom = '0px'
        if (this.fitWrapper) {
          this.fitWrapper.style.paddingBottom = '0px'
        }
        return false
      }
      if (target.scrollTop) {
        // if (target.scrollTop % this.contentWrapper.offsetHeight > this.remainHeight*4) {
        this.tableCopy = this.table.slice(i,this.remain + i)
        this.contentWrapper.style.paddingTop = target.scrollTop + 'px'
        this.contentWrapper.style.paddingBottom = this.contentBottom - target.scrollTop + 'px'
        if (this.fitWrapper) {
          this.fitWrapper.style.paddingTop = target.scrollTop + 'px'
          this.fitWrapper.style.paddingBottom = this.contentBottom - target.scrollTop + 'px'
        }
      } else {
        this.contentWrapper.style.paddingTop = '0px'
        this.contentWrapper.style.paddingBottom = this.contentBottom + 'px'
        if (this.fitWrapper) {
          this.fitWrapper.style.paddingTop = '0px'
          this.fitWrapper.style.paddingBottom = this.contentBottom + 'px'
        }
        this.tableCopy = this.table.slice(0,this.remain)
      }
      // 这是一个比较hack的方法，如果win出现问题就去掉
      this.contentWrapper.style.opacity = 0.9
      setTimeout(()=>{
        this.contentWrapper.style.opacity = 1
      },1)
    },
    initTable () {
      this.contentWrapper.parentElement.scrollTop = 0
      try {
        this.contentWrapper.parentElement.scrollTo(0,0)
      } catch (e) {
        // nothing
      }
      if (this.table.length <= 30 || this.maxHeight === 'auto') {
        this.tableCopy = this.table
        this.contentWrapper.style.paddingBottom =  '0px'
        this.contentWrapper.style.paddingTop =  '0px'
        if (this.fitWrapper) {
          this.fitWrapper.style.paddingTop = '0px'
          this.fitWrapper.style.paddingBottom =  '0px'
        }
        return
      }
      this.contentBottom = (this.table.length - this.tableCopy.length) * this.remainHeight
      this.contentWrapper.style.paddingBottom =  this.contentBottom + 'px'
      if (this.fitWrapper) {
        this.fitWrapper.style.paddingTop = '0px'
        this.fitWrapper.style.paddingBottom =  this.contentBottom + 'px'
      }
      this.tableCopy = this.table.slice(0,30)
    },
    resetInitTableData () {
      this.$emit('update:table', this.initTableData)
    },
    updateInitTableData () {
      this.initTableData = JSON.parse(JSON.stringify(this.table))
    }
  },
  watch: {
    table: {
      handler (val) {
        if (!this.initTableData || this.initTableData.length === 0) {
          this.initTableData = val
        }
        if (this.contentWrapper) {
          this.initTable()
        }
      },
      deep: true
    },
    maxHeight (val) {
      this.$nextTick(() => {
        this.$el.style.maxHeight = val + 'px'
      })
    }
  },
  beforeDestroy () {
    this.$refs.table.bodyWrapper.removeEventListener('scroll', this.scrollHandler)
  },
  updated () {
    // console.log(this.table)
  },
  mounted () {
    this.$nextTick(() => {
      this.contentWrapper = this.$el.getElementsByClassName('el-table__body-wrapper')[0].getElementsByTagName('table')[0]
      if (this.$el.getElementsByClassName('el-table__fixed-body-wrapper').length !== 0) {
        this.fitWrapper = this.$el.getElementsByClassName('el-table__fixed-body-wrapper')[0].getElementsByTagName('table')[0]
      }
      this.$refs.table.bodyWrapper.addEventListener('scroll', this.scrollHandler)
      if (this.table.length !== 0) {
        this.initTable()
      }
    })
  }
}
</script>

<style lang="scss">
.el-table .el-table__hight-same {
  &,td {
    background: #a0d2b4 !important;
  }
}
.el-table .el-table__hight-self {
  &,td {
    background: #c1f8d4 !important;
  }
}
</style>
