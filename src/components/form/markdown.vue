<template>
  <textarea :id="id" class="gee-com-markdown" style="display: none;"></textarea>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'
import 'simplemde/dist/simplemde.min.css'
// github: https://github.com/sparksuite/simplemde-markdown-editor
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: 'text',
    event: 'updateText'
  },
  data () {
    return {
      id: 'geeComMarkDown' + new Date().getTime(),
      md: null
    }
  },
  methods: {
    mounted () {
      this.beforeDestroy()
      import('simplemde').then(Simplemde => {
        this.md = new Simplemde({
          element: document.getElementById(this.id),
          placeholder: this.placeholder,
          initialValue: this.text,
          hideIcons: ['guide', 'fullscreen', 'side-by-side'],
          autoDownloadFontAwesome: false,
          spellChecker: false
        })
        this.md.codemirror.on('change', () => {
          this.$emit('updateText', this.md.value())
          this.$emit('change')
        })
        this.md.codemirror.on('blur', () => {
          this.$emit('change')
        })
      })
    },
    beforeDestroy () {
      if (this.md) {
        this.md.toTextArea()
        this.md = null
      }
    }
  },
  watch: {
    text (val, old) {
      if (val !== this.md.value()) {
        this.md.value(val)
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
  mounted () {
    this.mounted()
  },
  beforeDestroy () {
    this.beforeDestroy()
  }
}
</script>

<style lang="scss">
.is-error {
  .editor-toolbar {
    border-color: #e67470;
  }
  .CodeMirror {
    border-color: #e67470;
  }
}
.is-success {
  .editor-toolbar {
    border-color: #4B9E65;
  }
  .CodeMirror {
    border-color: #4B9E65;
  }
}
</style>
