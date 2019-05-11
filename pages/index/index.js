// miniprogram/pages/main/main.js
var util=require('../../utils/util.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year:'',
    month:'',
    day:'',
    festivalName:'',
    festivalWish:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    var year=time[0];
    var month=time[1];
    var day=time[2];
    var festivalName='';
    var festivalWish='';
    if(app.appData.festivalInformation!=null){
      festivalName = app.appData.festivalInformation.festivalName;
      festivalWish = app.appData.festivalInformation.festivalWish;
    }
    this.setData({
      year:year,
      month:month,
      day:day,
      festivalName:festivalName,
      festivalWish:festivalWish
    })
    console.log(time)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})