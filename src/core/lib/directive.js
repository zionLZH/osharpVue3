import { Consts } from '@/utils/system'
var sysConsts = new Consts()

export function directiveInit (Vue) {
  Vue.directive('mShow', {
    componentUpdated (el, binding) {
      if (binding.value === false) {
        return
      }
      el.style.display = sysConsts.onMobile ? '' : 'none'
      window.addEventListener('resize', () => {
        el.style.display = sysConsts.onMobile ? '' : 'none'
      })
    }
  })

  Vue.directive('mHide', {
    componentUpdated (el, binding) {
      if (binding.value === false) {
        return
      }
      el.style.display = !sysConsts.onMobile ? '' : 'none'
      window.addEventListener('resize', () => {
        el.style.display = !sysConsts.onMobile ? '' : 'none'
      })
    }
  })
}
