const { defineConfig } = require("@vue/cli-service");
const isProduction = process.env.NODE_ENV === "production";
const cdn = {
  css: [],
  js: [
    "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js",
    "https://cdn.jsdelivr.net/npm/echarts@5.3.1/dist/echarts.min.js",
  ],
};
const Ico = "favicon.ico";
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    if (isProduction) {
      // 用cdn方式引入,分离第三方插件1
      config.externals = {
        lodash: "lodash",
        echarts: "echarts",
      };
    }
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "帆软大屏";
      return args;
    });
    if (isProduction) {
      config.plugin("html").tap((args) => {
        args[0].cdn = cdn;
        return args;
      });
    }
  },
  pwa: {
    iconPaths: {
      //浏览器图标
      favicon32: Ico,
      favicon16: Ico,
      appleTouchIcon: Ico,
      maskIcon: Ico,
      msTileImage: Ico,
    },
  },
});
