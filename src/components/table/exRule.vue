<template>
  <div class="exuser-list">
    <div class="item">
      <div class="key">号码类型</div>
      <div class="value">
        <el-select multiple collapse-tags v-model="a.OppoTelType">
          <el-option v-for="(item, index) in [{value: 0, text: '其他'},{value: 11, text: '移动手机'},{value: 21, text: '电信手机'},{value: 31, text: '联通手机'},{value: 61, text: '固话'}]" :value="item.value" :label="item.text"></el-option>
        </el-select>
        <el-switch class="fix" :value="a.OppoTelType.length==5" active-text="全选"  @change="a.OppoTelType = (!$event ? [] : [0,11,21,31,61])"></el-switch>
      </div>
    </div>

    <div class="item">
      <div class="key">日期时间</div>
      <div class="value">
        <el-popover content="110501 0811-110502 2003表示2011年5月1日8时11分至2011年5月2日晚20时3分 注意多个时间段要用逗号分隔">
          <el-input slot="reference" v-model="a.CallTime"></el-input>
        </el-popover>
      </div>
    </div>

    <el-row class="item in">
      <el-col :span="12">
        <div class="item">
          <div class="key">实际日期</div>
          <div class="value">
            <el-popover content="1105表示2011年5月 110501表示2011年5月1日 110501-110507表示11年5月1日至5月7日">
              <el-input slot="reference" v-model="a.BeginOn"></el-input>
            </el-popover>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="key">周&nbsp;&nbsp;&nbsp;&nbsp;几</div>
          <div class="value">
            <el-popover content="1 表示周一 2表示周二 依此类推 7表示周日">
              <el-input slot="reference" v-model="a.Weekly"></el-input>
            </el-popover>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="item in">
      <el-col :span="12">
        <div class="item">
          <div class="key">时&nbsp;&nbsp;&nbsp;&nbsp;间</div>
          <div class="value">
            <el-popover content="923-2215表示上午9时23分至晚22时15分">
              <el-input slot="reference" v-model="a.Hourmin"></el-input>
            </el-popover>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="key">时间类别</div>
          <div class="value">
            <el-select multiple collapse-tags v-model="a.TelDateBType">
              <el-option v-for="(item, index) in [{value:0,text:'4:30~7:30'},{value:1,text:'7:31~11:15'},{value:2,text:'11:16~13:30'},{value:3,text:'13:31~17:15'},{value:4,text:'17:16~19:00'},{value:5,text:'19:01~20:50'},{value:6,text:'20:51~23:59'},{value:7,text:'0点~5:30'}]" :value="item.value" :label="item.text"></el-option>
            </el-select>
            <el-switch class="fix" :value="a.TelDateBType.length==8" active-text="全选"  @change="a.TelDateBType = (!$event ? [] : [0,1,2,3,4,5,6,7])"></el-switch>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="item">
      <div class="key">时间类别(详细)</div>
      <div class="value">
        <el-select multiple collapse-tags v-model="a.TypeMore">
          <el-option v-for="(item, index) in [{value:0,text:'4:30~6:20'},{value:1,text:'6:21~7:10'},{value:2,text:'7:11~7:50'},{value:3,text:'7:51~8:25'},{value:4,text:'8:26~11:00'},{value:5,text:'11:01~11:30'},{value:6,text:'11:31~12:30'},{value:7,text:'12:31~13:20'},{value:8,text:'13:21~14:00'},{value:9,text:'14:01~16:50'},{value:10,text:'16:51~17:40'},{value:11,text:'17:41~18:50'},{value:12,text:'18:51~20:00'},{value:13,text:'20:01~21:50'},{value:14,text:'21:51~23:59'},{value:15,text:'0点~4:29'}]" :value="item.value" :label="item.text"></el-option>
        </el-select>
        <el-switch class="fix" :value="a.TypeMore.length==16" active-text="全选"  @change="a.TypeMore = (!$event ? [] : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])"></el-switch>
      </div>
    </div>

    <div class="item">
      <div class="key">时间类别(小时)</div>
      <div class="value">
        <el-select multiple collapse-tags v-model="a.Telhour">
          <el-option v-for="(item, index) in [{value:4,text:'4时'},{value:5,text:'5时'},{value:6,text:'6时'},{value:7,text:'7时'},{value:8,text:'8时'},{value:9,text:'9时'},{value:10,text:'10时'},{value:11,text:'11时'},{value:12,text:'12时'},{value:13,text:'13时'},{value:14,text:'14时'},{value:15,text:'15时'},{value:16,text:'16时'},{value:17,text:'17时'},{value:18,text:'18时'},{value:19,text:'19时'},{value:20,text:'20时'},{value:21,text:'21时'},{value:22,text:'22时'},{value:23,text:'23时'},{value:0,text:'0时'},{value:1,text:'1时'},{value:2,text:'2时'},{value:3,text:'3时'}]" :value="item.value" :label="item.text"></el-option>
        </el-select>
        <el-switch class="fix" :value="a.Telhour.length==24" active-text="全选"  @change="a.Telhour = (!$event ? [] : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23])"></el-switch>
      </div>
    </div>

    <el-row class="item in">
      <el-col :span="12">
        <div class="item">
          <div class="key">时&nbsp;&nbsp;&nbsp;&nbsp;长</div>
          <div class="value">
            <el-popover content="15-90表示通话时长从15秒至90秒">
              <el-input slot="reference" v-model="a.TelTime"></el-input>
            </el-popover>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="key">时长类别</div>
          <div class="value">
            <el-select multiple collapse-tags v-model="a.CallTimeLen">
              <el-option v-for="(item, index) in [{value:0,text:'其他'},{value:1,text:'1~15秒'},{value:2,text:'16~90秒'},{value:3,text:'1.5~3分'},{value:4,text:'3~5分'},{value:5,text:'5~10分'},{value:6,text:'>10分'}]" :value="item.value" :label="item.text"></el-option>
            </el-select>
            <el-switch class="fix" :value="a.CallTimeLen.length==7" active-text="全选"  @change="a.CallTimeLen = (!$event ? [] : [0,1,2,3,4,5,6])"></el-switch>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="item in">
      <el-col :span="12">
        <div class="item">
          <div class="key">联系类型</div>
          <div class="value">
            <el-select multiple collapse-tags v-model="a.CallType">
              <el-option v-for="(item, index) in [{value:0,text:'未知'},{value:11,text:'主叫'},{value:12,text:'<---'},{value:13,text:'呼转'},{value:21,text:'主短'},{value:22,text:'被短'},{value:31,text:'主彩'},{value:32,text:'被彩'}]" :value="item.value" :label="item.text"></el-option>
            </el-select>
            <el-switch class="fix" :value="a.CallType.length==9" active-text="全选"  @change="a.CallType = (!$event ? [] : [0,11,12,13,14,21,22,31,32])"></el-switch>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="key">长途标志</div>
          <div class="value">
            <el-select v-model="a.IsLongDistance" clearable>
              <el-option v-for="(item, index) in [{value:0,text: '否'},{value:1,text:'是'}]" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="item in">
      <el-col :span="12">
        <div class="item">
          <div class="key">通话状态</div>
          <div class="value">
            <el-select multiple collapse-tags v-model="a.RoamType">
              <el-option v-for="(item, index) in [{value:0,text:'其他'},{value:1,text:'本地'},{value:2,text:'漫游'}]" :value="item.value" :label="item.text"></el-option>
            </el-select>
            <el-switch class="fix" :value="a.RoamType.length==3" active-text="全选"  @change="a.RoamType = (!$event ? [] : [0,1,2])"></el-switch>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="key">虚拟标志</div>
          <div class="value">
            <el-select v-model="a.VirtualNet" clearable>
              <el-option v-for="(item, index) in [{value:0,text: '否'},{value:1,text:'是'}]" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="item">
      <div class="key">时间性质</div>
      <div class="value">
        <el-select v-model="a.InWorkTime" clearable>
          <el-option v-for="(item, index) in [{value:0,text: '私人时间'},{value:1,text:'工作时间'}]" :value="item.value" :label="item.text"></el-option>
        </el-select>
      </div>
    </div>

    <el-row class="item in">
      <el-col :span="12">
        <div class="item">
          <div class="key">位置区号</div>
          <div class="value">
            <el-popover content="格式为十六进制。要排除某个位置区号(LAC)，请在位置区号前添加减号，例如 -677D 就表示结果中不包含位置区号为677D的通话">
              <el-input slot="reference" v-model="a.Lac"></el-input>
            </el-popover>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="key">小区号</div>
          <div class="value">
            <el-popover content="默认十六进制，要排除某个基站小区号，前在基站代码前添加减号，例如 -A845 就表示结果中不包含基站小区号为A845的通话">
              <el-input slot="reference" v-model="a.Cell"></el-input>
            </el-popover>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="item">
      <div class="key">号码归属地</div>
      <div class="value">
        <el-popover content="多个归属地用空格分隔;要排除某个对属地，在归属地前添加减号，例如 -浙江温州 就表示在结果中排除所有浙江温州的号码">
          <el-input slot="reference" v-model="a.Area"></el-input>
        </el-popover>
      </div>
    </div>

    <el-row class="item in">
      <el-col :span="12">
        <div class="item">
          <div class="key">本方通话地</div>
          <div class="value">
            <el-popover content="要排除某本方通话地，前在本方通话地前添加减号，例如 -温州 就表示结果中不包含本方通话地为温州的通话">
              <el-input slot="reference" v-model="a.OwnAddr"></el-input>
            </el-popover>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="key">对方通话地</div>
          <div class="value">
            <el-popover content="要排除某对方通话地，前在对方通话地前添加减号，例如 -温州 就表示结果中不包含对方通话地为温州的通话">
              <el-input slot="reference" v-model="a.OppoAddr"></el-input>
            </el-popover>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {
    // gFnGroup: () => import('@/components/table/fnGroup')
  },
  props: {
    rule: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
       a: {
         OppoTelType: '',
         CallTime: '',
         BeginOn: '',
         Weekly: '',
         Hourmin: '',
         TelDateE: '',
         TelDateBType: '',
         TypeMore: '',
         Telhour: '',
         TeldateArray: '',
         TelTime: '',
         CallTimeLen: '',
         CallType: '',
         IsLongDistance: '',
         RoamType: '',
         VirtualNet: '',
         InWorkTime: '',
         Lac: '',
         Cell: '',
         IsHex: '',
         Area: '',
         OwnAddr: '',
         OppoAddr: '',
       }
    }
  },
  methods: {
  },
  watch: {
    a: {
      handler (val) {
        let j = JSON.parse(JSON.stringify(this.rule))
        if (JSON.stringify(val) === JSON.stringify(this.rule)) {
          return
        }
        for (let key in val) {
          if (val[key].constructor === Array) {
            j[key] = JSON.parse(JSON.stringify(val[key])).join(';')
            if (j[key].indexOf(';') === -1) {
              j[key] = j[key] + ';'
            }
          } else {
            j[key] = val[key]
          }
        }
        this.$emit('update:rule', j)
      },
      deep: true
    },
    rule: {
      handler (val) {
        if (JSON.stringify(val) === JSON.stringify(this.rule)) {
          return
        }
        for (let key in this.a) {
          if (this.rule[key] && this.a[key] != this.rule[key]) {
            if (this.rule[key].indexOf(';') !== -1) {
              let arr = this.rule[key].split(';')
              for (let z = 0; z < arr.length; z++) {
                if (arr[z]) {
                  this.a[key].push(parseInt(arr[z]))
                }
              }
            } else {
              this.a[key] = this.rule[key] + ''
            }
          }
        }
      },
      deep: true
    }
  },
  mounted () {
    for (let key in this.a) {
      if (this.rule[key]) {
        if (this.rule[key].indexOf && this.rule[key].indexOf(';') !== -1) {
          let arr = this.rule[key].split(';')
          for (let z = 0; z < arr.length; z++) {
            if (arr[z]) {
              this.a[key].push(parseInt(arr[z]))
            }
          }
        } else {
          this.a[key] = this.rule[key] + ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.exuser-list {
  .item {
    max-width: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    &.in {
      margin-bottom: 0px;
    }
    .key {
      flex-shrink: 0;
      padding: 0px 5px;
      color: darkblue;
    }
    .value {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      &>* {
        flex-grow: 1;
        min-width: 10px;
        &.fix {
          margin-left: 5px;
          flex-grow: 0;
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>
