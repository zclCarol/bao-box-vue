module.exports = {
  //publicPath: process.env.NODE_ENV === 'production' ? './' : '/', //根路径
  publicPath: './',

  devServer: {
    // open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9966',
        // target: 'http://127.0.0.1:9602',
        // target: 'http://172.16.41.221:9602/alloc-distr-system/',
        // ws: false,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '/bao-product'
        // }
      },
      '/shopping': {
        // target: 'http://localhost:3000/', // 本地后端地址
        target: 'http://101.132.181.9:3000/', // 线上后端地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/shopping': ''
        }
      }
    }
  }
}
