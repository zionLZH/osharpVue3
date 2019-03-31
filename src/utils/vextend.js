function typeReformat (val) {
  // ~:String $: Object ^: Boolean !: int
  if (val === undefined || val === null) {
    return val
  }
  let types = ['~', '$', '^', '!']
  if (typeof val === 'string' && types.indexOf(val.substr(0, 1)) !== -1) {
    val = val.substr(1, val.length)
    switch (val.substr(0, 1)) {
      case '~':
        return '' + val
      case '$':
        return JSON.parse(val)
      case '^':
        return val === 'true'
      case '!':
        return val * 1
      default:
        return val
    }
  } else {
    switch (typeof val) {
      case 'string':
        return '~' + val
      case 'object':
        return '$' + JSON.stringify(val)
      case 'boolean':
        return '^' + val.toString()
      case 'number':
        return '!' + val
      default:
        return val
    }
  }
}

export function routerPath (filterMap, sync) {
  let query = JSON.parse(JSON.stringify(this.$route.query))
  let params = JSON.parse(JSON.stringify(this.$route.params))
  for (let key in query) {
    let val = filterMap[key]
    if (val === undefined) { continue }
    (val.constructor === Object && val['value'] !== undefined) && (val = filterMap[key].value)
    if (sync) {
      (filterMap[key].constructor === Object && filterMap[key]['value'] !== undefined) ? (filterMap[key].value = typeReformat(query[key])) : (filterMap[key] = typeReformat(query[key]))
    } else {
      query[key] = typeReformat(val)
    }
  }
  for (let key in filterMap) {
    let val = filterMap[key]
    if (val === undefined) { continue }
    (val.constructor === Object && val['value'] !== undefined) && (val = filterMap[key].value)
    query[key] = typeReformat(val)
  }
  this.$router.replace({ name: this.$route.name, query, params })
}
