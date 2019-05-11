// miniprogram/pages/activityInfo/activityInfo.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityName:'',
    activitySite:'',
    activityDate:''
  },

  activityNameInput:function(e){
    this.setData({
      activityName:e.detail.value
    })
  },

  activitySiteInput:function(e){
    this.setData({
      activitySite:e.detail.value
    })
  },

  activityDateInput:function(e){
    this.setData({
      activityDate:e.detail.value
    })
  },

  addingSuccessTap:function(){
    var activityName=this.data.activityName;
    var activitySite=this.data.activitySite;
    var activityDate=this.data.activityDate;
    var userId=app.appData.userId.userId;
    var that=this;
    wx.cloud.init({
      env: 'jstu-calendar-bcbe6b',
      traceUser: true
    });
    const db = wx.cloud.database();
    db.collection('activityInformation').add({
      data:{
        activityName:activityName,
        activitySite:activitySite,
        activityDate:activityDate,
        userId:userId
      },
      success: function (res) {
        wx.showToast({
          title: '活动添加成功',
          icon: 'success',
          duration: 2000,
          mask: true
        })
        console.log(res);
        console.log(res.errMsg);
      }
    })
    wx.switchTab({
      url: '../activityManagement/activityManagement',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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