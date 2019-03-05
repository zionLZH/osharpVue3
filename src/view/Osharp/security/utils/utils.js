export function transformTozTreeFormat (sNodes) {
  // https://www.xuebuyuan.com/385756.html
  let i = 0
  let l = 0
  let key = 'Id'
  let parentKey = 'ParentId'
  let childKey = 'children'
  if (!key || key === '' || !sNodes) {
    return []
  }

  if (sNodes.constructor === Array) {
    let r = []
    let tmpMap = []
    for (i = 0, l = sNodes.length; i < l; i++) {
      tmpMap[sNodes[i][key]] = sNodes[i]
    }
    for (i = 0, l = sNodes.length; i < l; i++) {
      if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] !== sNodes[i][parentKey]) {
        if (!tmpMap[sNodes[i][parentKey]][childKey]) {
          tmpMap[sNodes[i][parentKey]][childKey] = []
        }
        tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i])
      } else {
        r.push(sNodes[i])
      }
    }
    return r
  } else {
    return [sNodes]
  }
}
