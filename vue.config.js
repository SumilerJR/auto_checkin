const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,//用于支持websocket
        changeOrigin: true,//用于控制请求头中的host值（是否修改请求的端口号）
        pathRewrite: { '^/api': '' }//重写请求路径，实现多路径请求
      },
    }
  }
});
