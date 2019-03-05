import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export function exportExcel (tableColumn, rtable, fileName) {
  let header = []
  let dts = []
  let table = JSON.parse(JSON.stringify(rtable))
  for (let key in tableColumn) {
    header.push(tableColumn[key].title || key)
  }
  for (let i = 0; i < table.length; i++) {
    let item = table[i]
    for (let key in item) {
      if (tableColumn[key]) {
        item[tableColumn[key].title] = item[key]
      }
      if (tableColumn[key] && tableColumn[key].format) {
        try {
          let tempDiv = document.createElement('div')
          tempDiv.innerHTML = tableColumn[key].format(item)
          tempDiv = tempDiv.outerText.replace(/( |\r)/gi, '').replace(/\n/gi, ',').replace(/,,/gi, ',')
          while (tempDiv.indexOf(',,') !== -1) {
            tempDiv = tempDiv.replace(/,,/gi, ',')
          }
          tempDiv = tempDiv.replace(/(^,|,$)/gi, '')
          item[tableColumn[key].title] = tempDiv
          tempDiv = null
        } catch (e) {
          console.error(e)
          // nothing
        }
      }
    }
    for (let key in item) {
      if (header.indexOf(key) === -1) {
        delete item[key]
      }
    }
    dts.push(item)
  }
  var wb = XLSX.utils.json_to_sheet(dts, {header: header, skipHeader: false})
  var wbout = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wbout, wb, 'Sheet1')
  wbout = XLSX.write(wbout,{ bookType:'xls', bookSST:true, type:'array' })
  try {
    FileSaver.saveAs(new Blob([wbout], { type: 'application/vnd.ms-excel;charset=utf-8' }), fileName + '.xls')
  } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
}
