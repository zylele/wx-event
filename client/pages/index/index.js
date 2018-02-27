
const util = require('../../utils/util.js');

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: null,
    startWeek: null,

    beforeDays: '',

    beforeADOrBC: '',
    beforeDate: '请输入数字进行计算',
    beforeWeek: '',

    afterDays: '',

    afterADOrBC: '',
    afterDate: '请输入数字进行计算',
    afterWeek: '',

    distDate: null,
    distWeek: null,

    stillDays: 0,

    showSlogan: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var now = util.formatTime(new Date());
    this.setData({
      startDate: now[1],
      startWeek: now[2],
      distDate: now[1],
      distWeek: now[2]
    });
  },

  /**
   * 改变起始日期
   */
  changeStartDate: function (e) {
    var selectDate = util.formatTime(new Date(e.detail.value));
    this.setData({
      startDate: selectDate[1],
      startWeek: selectDate[2]
    });
    var beforeDays = Number(this.data.beforeDays) || 0;
    if (beforeDays > 0) {
      this.calBeforeDate(new Date(selectDate[1]), beforeDays);
    }

    var afterDays = Number(this.data.afterDays) || 0;
    if (afterDays > 0) {
      this.calAfterDate(new Date(selectDate[1]), afterDays);
    }

    this.calDistDays(selectDate[1], this.data.distDate);

  },

  /**
   * 改变几天之前
   */
  changeBeforeDays: function (e) {
    var days = e.detail.value;
    if (typeof days == 'undefined' || days == '') {
      days = 0;
    }
    if(days > 0){
      this.calBeforeDate(new Date(this.data.startDate), days);
      this.setData({
        beforeDays: days
      })
    }
    
  },

  /**
   * 计算几天之前的日期
   */
  calBeforeDate: function (startDate, days) {
    var beforeDate = util.formatTime(new Date(startDate.getTime() - days * 86400000));
    this.setData({
      beforeADOrBC: beforeDate[0],
      beforeDate: beforeDate[1],
      beforeWeek: beforeDate[2]
    });
  },

  /**
     * 改变几天之后
     */
  changeAfterDays: function (e) {
    var days = e.detail.value;
    if (typeof days == 'undefined' || days == '') {
      days = 0;
    }
    if (days > 0) {
      this.calAfterDate(new Date(this.data.startDate), days);
      this.setData({
        afterDays: days
      })
    }
  },

  /**
   * 计算几天之后的日期
   */
  calAfterDate: function (startDate, days) {
    var afterDate = util.formatTime(new Date(startDate.getTime() + days * 86400000));
    this.setData({
      afterADOrBC: afterDate[0],
      afterDate: afterDate[1],
      afterWeek: afterDate[2]
    });
  },

  /**
   * 点击距离日期适当滚动
   */
  distDateScroll: function () {
    wx.pageScrollTo({
      scrollTop: 70
    })
  },

  /**
   * 改变距离日期
   */
  changeDistDate: function (e) {
    var selectDate = new Date(e.detail.value);
    var distDate = util.formatTime(selectDate);

    this.setData({
      distDate: distDate[1],
      distWeek: distDate[2]
    });

    this.calDistDays(this.data.startDate, distDate[1]);

    wx.pageScrollTo({
      scrollTop: 0
    });

    // 检测彩蛋
    this.checkDistDateEgg(selectDate);
  },

  /**
   * 计算距离日期间隔
   */
  calDistDays: function (startDate, distDate) {
    var stillDays = (new Date(distDate).getTime() - new Date(startDate).getTime()) / 86400000;
    this.setData({
      stillDays: stillDays
    });
  },

  /**
   * 距离日期彩蛋
   */
  checkDistDateEgg: function (date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month == 7 && day == 6) {//乐乐生日
      var year = date.getFullYear();
      var nowYear = new Date().getFullYear();
      if (year > nowYear && year <= 2092) {
        wx.showModal({
          title: '这一天有大事',
          content: '提前祝计日指期开发者乐乐生日快乐',
          showCancel: false
        });
      }
    } else if (month == 7 && day == 31) {//毛毛生日
      var year = date.getFullYear();
      var nowYear = new Date().getFullYear();
      if (year > nowYear && year <= 2092) {
        wx.showModal({
          title: '一个彩蛋',
          content: '这一天有大事！',
          confirmText: '什么大事',
          showCancel: false,
          success: function (res) {
            wx.showModal({
              title: '',
              content: 'L:提前祝毛毛生日快乐！想买啥？',
              confirmText: '我想想',
              showCancel: false,
              success: function (res) {
                wx.showLoading({
                  title: '毛毛抓耳挠腮',
                  mask: true
                });
                setTimeout(function () {
                  wx.hideLoading();
                  wx.showModal({
                    title: '',
                    content: 'L:还没想好吗？',
                    confirmText: '好惹！',
                    showCancel: false,
                    success: function (res) {
                      wx.showModal({
                        title: '',
                        content: 'xx口红xx霜xxx神仙水',
                        confirmText: '就这些吧',
                        showCancel: false,
                        success: function (res) {
                          wx.showModal({
                            title: '',
                            content: 'L:再加点吧',
                            confirmText: '怎好意思',
                            showCancel: false,
                            success: function (res) {
                              wx.showModal({
                                title: '',
                                content: '那iPhone X(作者注：这里X指' + year + '年出的型号)',
                                confirmText: '这下够了',
                                showCancel: false,
                                success: function (res) {
                                  wx.showModal({
                                    title: '',
                                    content: 'L:搞一波大的吧，Tesla MODEL X 怎么样',
                                    confirmText: '嘻嘻爱你',
                                    showCancel: false,
                                    success: function (res) {
                                      wx.showLoading({
                                        title: '正在发送毛毛的爱',
                                        mask: true
                                      });
                                      setTimeout(function () {
                                        wx.showToast({
                                          title: '发送成功',
                                          icon: 'success',
                                          duration: 2000
                                        });
                                      }, 3000);
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }, 3000);
              }
            });
          }
        });
      }
    }
  },

  /**
   * 触摸彩蛋
   */
  showSlogan: function () {
    this.setData({
      showSlogan: true
    });
  },
  hideSlogan: function () {
    this.setData({
      showSlogan: false
    });
  },

  /**
   * 分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '时间，时间会给我答案',
      path: '/pages/index/index'
    }
  }
})