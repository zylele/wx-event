/**
 * @fileOverview 微信小程序的入口文件
 */

var qcloud = require('./vendor/wafer2-client-sdk/index');
var config = require('./config');

App({
  /**
   * 小程序初始化时执行，我们初始化客户端的登录地址，以支持所有的会话操作
   */
  onLaunch() {
    qcloud.setLoginUrl(config.service.loginUrl);
    qcloud.login({
      success: function (userInfo) {
        console.log('登录成功', userInfo);
      },
      fail: function (err) {
        console.log('登录失败', err);
      }
    });
    qcloud.request({
      url: 'https://jeml31zf.qcloud.la/weapp/hello',
      success: function (response) {
        console.log(response);
      },
      fail: function (err) {
        console.log(err);
      }
    });
  }
});