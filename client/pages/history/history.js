// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://www.ipip5.com/today/api.php?type=json',
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})