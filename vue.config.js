module.exports = {
  publicPath: '',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.osharp.org'
      }
    }
  }
}
