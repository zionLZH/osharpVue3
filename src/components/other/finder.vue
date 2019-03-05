<template>
  <div>
    <ul class="gee-com-finder">
      <li class="item pointIt" :style="atDel?'color: #fff;background: #ca5a4b;':''" v-for="(item, index) in mlist" :key="index" @click="open(item);delItem(item);">
        <i v-if="!atDel" :class="item.icon || 'el-icon-g-plug'"></i>
        <i v-if="atDel" class="el-icon-g-remove"></i>
        <div class="title" v-text="item.title"></div>
      </li>
      <li class="item pointIt" v-if="addBtn" @click="addDialog = true">
        <i class="el-icon-g-add"></i>
        <div class="title">添加</div>
      </li>
      <li class="item pointIt" v-if="addBtn" @click="atDel = !atDel">
        <i :class="{'el-icon-g-remove': !atDel, 'el-icon-success': atDel}"></i>
        <div class="title" v-text="atDel?'完成':'删除'"></div>
      </li>
    </ul>
    <el-dialog :visible.sync="addDialog" custom-class="gee-clear-dialog">
      <template slot="title">添加快捷方式</template>
      <template slot="footer">
        <el-button size="small" @click="doAdd">确定</el-button>
      </template>
      <el-form>
        <el-form-item label="请选择功能">
          <span v-text="currentItem.title || '点击选择'" class="pointIt c-green" @click="showSelect = true"></span>
        </el-form-item>
        <el-form-item label="请选择图标">
          <span class="pointIt">
            <i class="el-icon-g-plug" :class="{'c-green': currentIcon == 'el-icon-g-plug'}" @click="currentIcon = 'el-icon-g-plug'"></i>
            <i class="el-icon-g-tools" :class="{'c-green': currentIcon == 'el-icon-g-tools'}" @click="currentIcon = 'el-icon-g-tools'"></i>
            <i class="el-icon-g-password" :class="{'c-green': currentIcon == 'el-icon-g-password'}" @click="currentIcon = 'el-icon-g-password'"></i>
            <i class="el-icon-g-table" :class="{'c-green': currentIcon == 'el-icon-g-table'}" @click="currentIcon = 'el-icon-g-table'"></i>
            <i class="el-icon-g-keystore" :class="{'c-green': currentIcon == 'el-icon-g-keystore'}" @click="currentIcon = 'el-icon-g-keystore'"></i>
            <i class="el-icon-g-print" :class="{'c-green': currentIcon == 'el-icon-g-print'}" @click="currentIcon = 'el-icon-g-print'"></i>
            <i class="el-icon-g-clac" :class="{'c-green': currentIcon == 'el-icon-g-clac'}" @click="currentIcon = 'el-icon-g-clac'"></i>
            <i class="el-icon-g-message" :class="{'c-green': currentIcon == 'el-icon-g-message'}" @click="currentIcon = 'el-icon-g-message'"></i>
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <pop-select v-if="showSelect" :list="routes" :visible.sync="showSelect" showKey="title" :currentItem.sync="currentItem"></pop-select>
  </div>
</template>

<script>
import * as system from '@/utils/system'
export default {
  components: {
    popSelect: () => import('@/components/popover/select')
  },
  props: {
    routes: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    addBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      showSelect: false,
      mlist: [],
      currentItem: {},
      currentIcon: 'el-icon-g-plug',
      addDialog: false,
      atDel: false
    }
  },
  methods: {
    open (item) {
      if (this.atDel) {
        return
      }
      this.$router.push({
        name: item.name
      })
    },
    delItem (index) {
      if (!this.atDel) {
        return
      }
      this.mlist.splice(index, 1)
      system.dataSet('finder_list', this.mlist)
      if (this.mlist.length === 0) {
        this.atDel = false
      }
      this.syncList()
    },
    doAdd () {
      this.addDialog = false
      if (this.currentItem && this.currentItem.title) {
        let _item = JSON.parse(JSON.stringify(this.currentItem))
        _item.icon = JSON.parse(JSON.stringify(this.currentIcon))
        this.mlist.push(_item)
        system.dataSet('findermlist', this.mlist)
      }
      this.currentItem = {}
      this.currentIcon = 'el-icon-g-plug'
    },
    syncList () {
      this.$emit('update:list', this.mlist)
    }
  },
  mounted () {
    if (this.list.length === 0) {
      this.mlist = system.dataGet('finder_list') || []
    } else {
      this.mlist = this.list
    }
  }
}
</script>

<style lang="scss" scoped>
.gee-com-finder {
  margin: 0px;
  padding: 0px;
  list-style: none;
  .item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 90px;
    height: 90px;
    margin: 0px 10px 10px 0px;
    transition: all .4s;
    &:hover {
      background-color: #ccc;
    }
    [class^="el-icon-"] {
      font-size: 28px;
    }
    .title {
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
.pointIt {
  i {
    font-size: 28px;
  }
}
</style>

<style lang="scss">
@import '@/components/style/dialogClear.scss';
</style>
