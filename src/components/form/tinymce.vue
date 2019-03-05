<template>
  <textarea :id="id" class="gee-com-tinymce" style="display: ;"></textarea>
</template>

<script>
// main
import tinymce from 'tinymce/tinymce'
// theme
import 'tinymce/themes/modern/theme'
import './tinymce/gee/content.min.css'
import './tinymce/gee/skin.ie7.min.css'
import './tinymce/gee/skin.min.css'
// language
import './tinymce/langs/zh_CN.js'
// plugins
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/table'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/colorpicker'
// import './tinymce/gee/skin.mobile.min.css'
export default {
  props: {
    htext: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: 'htext',
    event: 'updateText'
  },
  data () {
    return {
      id: 'geeComTinyMCE' + new Date().getTime(),
      tinymce: null,
      editor: null
    }
  },
  methods: {
    enHtml (str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;')
    },
    deHtml (str) {
      return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#39;/g, '\'').replace(/&quot;/g, '\'')
    },
    mounted () {
      const VM = this
      this.tinymce = tinymce.init({
        selector: `#${this.id}`,
        height: 415,
        theme: 'modern',
        menubar: false,
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        plugins: 'image preview paste link table textcolor colorpicker',
        toolbar: 'styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen ',
        init_instance_callback (editor) {
          VM.editor = editor
          editor.on('input', () => {
            VM.$emit('updateText', VM.enHtml(editor.getContent()))
            VM.$emit('change')
          })
          VM.htext && editor.setContent(VM.deHtml(VM.htext))
        }
      })
    },
    beforeDestroy () {
      // nothing
      tinymce.get(this.id).destroy()
    }
  },
  watch: {
    htext (val, old) {
      if (this.editor && val !== this.enHtml(this.editor.getContent())) {
        this.editor.setContent(this.deHtml(val))
      }
    },
    '$route': {
      handler (R) {
        if (R.name === this.$route.name) {
          this.beforeDestroy()
          this.mounted()
        }
      },
      deep: true
    }
  },
  beforeDestroy () {
    this.beforeDestroy()
  },
  mounted () {
    this.mounted()
  }
}
</script>

<style lang="scss">
@media only screen and (min-width: 100px) and (max-width: 640px) {
.mce-panel.mce-floatpanel {
    max-width: 100%;
    border-radius: 0px;
    .mce-title {
      font-size: 16px;
    }
  }
}
.is-error {
  .mce-tinymce {
    border-color: #e67470;
  }
  .mce-edit-area {
    border-color: #e67470;
  }
  .mce-statusbar {
    border-color: #e67470;
  }
}
.is-success {
  .mce-tinymce {
    border-color: #4B9E65;
  }
  .mce-edit-area {
    border-color: #4B9E65;
  }
  .mce-statusbar {
    border-color: #4B9E65;
  }
}
</style>
