const baseCheck = (val) => {
  return !!(val && val.replace(/( |\r|\n|\t)/gi, '') !== '' ? 1 : 0)
}
export default {
  noEmpty (val) {
    return !!(baseCheck(val) ? 1 : 0)
  },
  mail (val) {
    return !!(baseCheck(val) && /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$)|(^$)/.test(val) ? 1 : 0)
  },
  phone (val) {
    return !!(baseCheck(val) && /^(1)+\d{10}$/.test(val) ? 1 : 0)
  },
  password (val) {
    return !!(baseCheck(val) && val.length >= 6 ? 1 : 0)
  },
  passwordMid (val) {
    return !!(baseCheck(val) && /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(val) ? 1 : 0)
  },
  passwordHight (val) {
    return !!(baseCheck(val) && /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{6,}$/.test(val) ? 1 : 0)
  },
  passwordMax (val) {
    return !!(baseCheck(val) && /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[_.#?])[0-9a-zA-Z_.#?]{6,}$/.test(val) ? 1 : 0)
  },
  url (val) {
    return !!(baseCheck(val) && /(^[http,https]+:\/\/[a-zA-Z\d]+\.[a-zA-Z]{2})/.test(val) ? 1 : 0)
  },
  idCard (val) {
    return !!(baseCheck(val) && (val.length === 15 || val.length === 18) && /^\d{6}(18|19|20|)\d{2}(1[0-2]|0[1-9])([0-3][0-9])\d{3}(\d{1}|X|)$/.test(val) ? 1 : 0)
  },
  filename (val) {
    return !!(baseCheck(val) && !/(\\|\/|:|\?|\*|<|>|\|)/.test(val) && /(^[a-zA-Z0-9]+\.[a-zA-Z0-9])/.test(val) ? 1 : 0)
  },
  sex (val) {
    return !!(baseCheck(val) && /^(男|女|未知)/.test(val) ? 1 : 0)
  },
  number (val) {
    return !!(val * 1 && (val * 1 >= 0 || val * 1 < 0) ? 1 : 0)
  },
  date (val) {
    return !!(baseCheck(val) && new Date(val).getTime() * 1 ? 1 : 0)
  }
}
