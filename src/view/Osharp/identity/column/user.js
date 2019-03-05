export default {
  UserName: {
    width: '100px',
    title: '用户名',
    sort: true
  },
  NickName: {
    width: '100px',
    title: '昵称',
    sort: true
  },
  Email: {
    title: '邮箱',
    sort: true
  },
  EmailConfirmed: {
    width: '95x',
    title: '邮箱确认',
    sort: true
  },
  PhoneNumber: {
    width: '110x',
    title: '手机号',
    sort: true
  },
  PhoneNumberConfirmed: {
    width: '100x',
    title: '手机确认',
    sort: true
  },
  Roles: {
    title: '角色',
    sort: true,
    format (item) {
      try {
        return item.Roles.join(',')
      } catch (e) {
        return ''
      }
    }
  },
  IsLocked: {
    width: '100x',
    title: '是否锁定',
    sort: true
  },
  LockoutEnabled: {
    width: '90x',
    title: '登陆锁',
    sort: true
  },
  AccessFailedCount: {
    width: '120x',
    title: '登陆错误',
    sort: true
  },
  LockoutEnd: {
    width: '90x',
    title: '锁时间',
    sort: true
  },
  CreatedTime: {
    title: '注册时间',
    width: '200px',
    sort: true,
    format (item) {
      try {
        return new Date(item.CreatedTime).Format('yyyy-MM-dd hh:mm:ss')
      } catch (e) {
        return item.CreatedTime
      }
    }
  }
}
