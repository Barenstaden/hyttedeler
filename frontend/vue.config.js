module.exports = {
  devServer: {
    proxy: {
      '': {
        target: 'http://localhost:1337'
      }
    }
  },
  css: {
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV !== "production" ? true : false
      }
    }
  }
};
