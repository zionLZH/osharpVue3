import Vue from 'vue'

class Core {
  constructor (arg) {
    this.pageMini = innerWidth <= 640
    const self = this
    window.addEventListener('resize', () => {
      self.pageMini = innerWidth <= 640
    })
  }
}
const bridge = new Vue()
export {
  Core,
  bridge
}
