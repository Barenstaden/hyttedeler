const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: {
    output: {
      crossOriginLoading: "anonymous",
    },
    plugins: [new CompressionPlugin(), new BundleAnalyzerPlugin()],
  },
  devServer: {
    proxy: {
      "": {
        target: "http://localhost:1337",
      },
      connect: {
        target: "http://localhost:1337",
      },
    },
  },
  css: {
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV !== "production" ? true : false,
      },
    },
  },
  pluginOptions: {
    webpack: {
      dir: ["./webpack"],
    },
  },
};
