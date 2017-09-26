
const util = require('../../utils/util.js')

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: null,
    startWeek: null,

    beforeDays: null,

    beforeDate: "请输入数字进行计算",
    beforeWeek: "",

    afterDays: null,

    afterDate: "请输入数字进行计算",
    afterWeek: "",

    distDate: null,
    distWeek: null,

    stillDays: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var now = util.formatTime(new Date());
    this.setData({
      startDate: now[0],
      startWeek: now[1],
      distDate: now[0],
      distWeek: now[1],
      stillDays: 0
    });
  },

  /**
   * 改变起始日期
   */
  changeStartDate: function (e) {
    var selectDate = util.formatTime(new Date(e.detail.value));
    this.setData({
      startDate: selectDate[0],
      startWeek: selectDate[1],
    });
    var days = Number(this.data.beforeDays) || 0;
    this.calBeforeDate(new Date(selectDate[0]), days);
  },

/**
 * 改变几天之前
 */
  changeBeforeDays: function (e) {
    var days = e.detail.value;
    this.setData({
      beforeDays: days
    });
    this.calBeforeDate(new Date(this.data.startDate), days);
  },

/**
 * 计算几天之前的日期
 */
  calBeforeDate: function (startDate, days) {
    var beforeDate = util.formatTime(new Date(startDate.getTime() - days * 1000 * 60 * 60 * 24));
    this.setData({
      beforeDate: beforeDate[0],
      beforeWeek: beforeDate[1]
    });
  }

})