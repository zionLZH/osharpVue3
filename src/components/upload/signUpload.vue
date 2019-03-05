<template>
  <div class="gee-com-sign-upload" v-loading="uploading">
    <el-upload
      class="uploader"
      :action="action"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :on-error="handleError">
      <img v-if="file && isImg(getType(file))" class="file" :src="file" alt="" />
      <svg v-if="file && !isImg(getType(file))" class="icon" aria-hidden="true" v-html="getIcon(getType(file))"></svg>
      <div v-if="!file" class="el-icon-plus"></div>
    </el-upload>
    <div slot="tip" class="remark">
      <el-tooltip v-if="file && isImg(getType(file))" effect="dark" content="查看大图" placement="top-start">
        <el-button @click="openNew(file)" class="icon" type="primary" icon="el-icon-view" circle></el-button>
      </el-tooltip>
      <el-tooltip v-if="file && !isImg(getType(file))" effect="dark" content="点击下载" placement="top-start">
        <el-button @click="openNew(file)" class="icon" type="primary" icon="el-icon-download" circle></el-button>
      </el-tooltip>
      <span v-text="file ? '点击更换' : '点击上传'"></span>
    </div>
  </div>
</template>

<script>
import * as system from '@/utils/system'

export default {
  props: {
    file: {
      type: String,
      default: ''
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
      if (res.Type !== 200) {
        this.$message.error(res.Content)
        return false
      }
      this.$emit('update:file', res.Data[0].FilePath)
    },
    handleError (res, file) {
      this.uploading = false
      if (res.Message) {
        this.$message.error(res.Message)
        return false
      }
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

<style lang="scss" scoped>
.gee-com-sign-upload {
  display: inline-block;
  .item {
    display: inline-block;
    margin-bottom: 5px;
    .tip {
      max-width: 100px;
      margin: 0px auto !important;
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
