<template>
  <div class="gee-com-multiple-upload" v-loading="uploading">
    <div class="item" style="height: 158px" v-for="(item,index) in file" :key="index">
      <div class="uploader">
        <img v-if="isImg(getType(item))" class="file" :src="item" alt="" />
        <svg v-else class="icon" aria-hidden="true" v-html="getIcon(getType(item))"></svg>
        <div class="remove-mark" @click="removeItem(index)">
          <div class="el-icon-delete"></div>
        </div>
        <!--<div v-else :class="'iconfont ' + getIcon(getType(item))"></div>-->
      </div>
      <div class="tip">
        <el-tooltip v-if="file && isImg(getType(item))" effect="dark" content="查看大图" placement="top-start">
          <el-button @click="openNew(file)" class="icon" type="primary" icon="el-icon-view" circle></el-button>
        </el-tooltip>
        <el-tooltip v-if="file && !isImg(getType(item))" effect="dark" content="点击下载" placement="top-start">
          <el-button @click="openNew(file)" class="icon" type="primary" icon="el-icon-download" circle></el-button>
        </el-tooltip>
        <span v-text="getName(item)"></span>
      </div>
    </div>
    <div class="item" style="height: 158px;">
      <el-upload
        class="uploader"
        :action="action"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :on-error="handleError"
        :on-exceed="handleExceed"
        :limit="limit"
        multiple>
        <div class="el-icon-plus"></div>
      </el-upload>
      <div class="tip">点击上传</div>
    </div>
  </div>
</template>

<script>
import * as system from '@/utils/system'

export default {
  props: {
    file: {
      type: Array,
      default: () => []
    },
    action: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 5 * 1024 * 1024
    },
    type: {
      type: String,
      default: '(.*?)'
    },
    limit: {
      type: Number,
      default: 9999
    }
  },
  data () {
    return {
      uploading: false
    }
  },
  methods: {
    beforeUpload (file) {
      if (file.size >= this.size) {
        this.$message.error(`文件大小不能超过 ${this.size / 1024 / 1024}MB!`)
        return false
      }
      let reg = new RegExp(this.type, 'gi')
      if (!reg.test(file.type)) {
        this.$message.error('文件格式错误，请重新上传')
        return false
      }
      this.uploading = true
      return true
    },
    handleSuccess (res, file) {
      this.uploading = false
      if (res.Message && res.Errored) {
        this.$message.error(res.Message)
        return false
      }
      res = res.Data
      for (let i = 0; i < res.length; i++) {
        res[i] = res[i].FilePath
      }
      this.$emit('update:file', res.concat(this.file))
    },
    handleError (res, file) {
      this.uploading = false
      if (res.Message) {
        this.$message.error(res.Message)
        return false
      }
      return false
    },
    handleExceed () {
      this.$message.error(`最多允许选择 ${this.limit} 张图片`)
      return false
    },
    isImg (type) {
      return /(png|jpg|jpeg|gif|bmp|webp)/gi.test(type)
    },
    getType (path) {
      let arr = path.split('.')
      return arr[arr.length - 1]
    },
    getName (path) {
      let arr = path.split('/')
      return arr[arr.length - 1]
    },
    getIcon (type) {
      let iconMap = {doc: 'doc', docx: 'doc', xls: 'xls', xlsx: 'xls', ppt: 'ppt', rar: 'rar', zip: 'zip', psd: 'psd', ai: 'ai', txt: 'txt', pdf: 'pdf', ipa: 'ipa', apk: 'apk', dll: 'dll', exe: 'exe', tar: 'tar', mp4: 'video', mov: 'video', flv: 'video', mkv: 'video', webm: 'video', mpg: 'video', mpeg: 'video', mp3: 'music', audio: 'music', wmv: 'music', acc: 'music', ogg: 'music', amr: 'music', flac: 'music'}
      return `
        <use xlink:href="#icon-${(iconMap[type.toLowerCase()] || 'none')}"></use>
      `
      // return 'icon-' + (iconMap[type.toLowerCase()] || 'none')
    },
    removeItem (index) {
      let arr = JSON.parse(JSON.stringify(this.file))
      arr.splice(index, 1)
      this.$emit('update:file', arr)
    },
    openNew (path) {
      window.open(path)
    }
  },
  computed: {
    authBear () {
      return {Authorization: 'Bearer ' + system.dataGet('auth', true)}
    }
  }
}
</script>

<style scoped>
@import url('./font/iconfont.css');
</style>

<style lang="scss" scoped>
.gee-com-multiple-upload {
  display: inline-block;
  .item {
    overflow: hidden;
    display: inline-block;
    margin-bottom: 5px;
    .tip {
      max-width: 100px;
      padding-right: 5px;
      margin: 0px auto !important;
      margin-top: 5px !important;
      font-size: 13px;
      line-height: 1 !important;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .el-icon-plus:hover {
    color: #609b6a !important;
  }
  .uploader:hover {
    border-color: #609b6a !important;
  }
  .uploader {
    display: inline-block;
    width: 120px;
    height: 120px;
    margin-right: 15px;
    position: relative;
    overflow: hidden;
    border-radius: 6px;
    border: 1px dashed #d9d9d9;
    .file, .el-icon-plus, .iconfont, .remove-mark {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 120px;
      height: 120px;
      font-size: 48px;
      text-align: center;
      line-height: 120px;
      color: #d9d9d9;
    }
    .icon {
      width: 60px;
      height: 60px;
      margin: 30px;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    .iconfont {
      color: #333;
    }
    .remove-mark {
      display: none;
      z-index: 99;
      background-color: rgba(255, 47, 77, 0.85);
      cursor: pointer;
    }
    &:hover .remove-mark {
      display: block;
      .el-icon-delete {
        color: #fff !important;
      }
    }
  }
  .remark {
    // margin: 10px 0px !important;
    line-height: 1 !important;
    font-size: 14px;
    color: #666666;
    text-align: center;
  }
  .icon {
    padding: 5px;
  }
}
</style>
