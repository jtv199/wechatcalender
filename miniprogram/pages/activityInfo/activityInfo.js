// miniprogram/pages/activityInfo/activityInfo.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityName:'',
    activitySite:'',
    beginDateDisplay:'',
    beginDate:'',
    beginTimeDisplay:'',
    beginTime:'',
    endDateDisplay:'',
    endDate:'',
    endTimeDisplay:'',
    endTime:''
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

  handleBeginDateChange(e) {
    console.log(e.detail.value)
    let [year, month, day] = e.detail.value.split('-')
    var beginDate=parseInt(year)*10000+parseInt(month)*100+parseInt(day)
    console.log(typeof beginDate)
    this.setData({
      beginDate: beginDate,
      beginDateDisplay:e.detail.value
    })
    console.log(this.data.beginDate)
  },

  handleBeginTimeChange(e) {
    let [hour, minute] = e.detail.value.split(':')
    var beginTime=parseInt(hour)*100+parseInt(minute)
    this.setData({
      beginTime: beginTime,
      beginTimeDisplay:e.detail.value
    })
    console.log(this.data.beginTime)
  },

  handleEndDateChange(e) {
    console.log(e.detail.value)
    let [year, month, day] = e.detail.value.split('-')
    var endDate = parseInt(year) * 10000 + parseInt(month) * 100 + parseInt(day)
    this.setData({
      endDate: endDate,
      endDateDisplay:e.detail.value
    })
    console.log(this.data.endDate)
  },

  handleEndTimeChange(e) {
    let [hour, minute] = e.detail.value.split(':')
    var endTime=parseInt(hour)*100+parseInt(minute)
    this.setData({
      endTime: endTime,
      endTimeDisplay:e.detail.value
    })
    console.log(this.data.endTime)
  },

  addingSuccessTap:function(){
    var activityName=this.data.activityName;
    var activitySite=this.data.activitySite;
    var beginDateDisplay=this.data.beginDateDisplay;
    var beginDate=this.data.beginDate;
    var beginTimeDisplay=this.data.beginTimeDisplay;
    var beginTime=this.data.beginTime;
    var endDateDisplay=this.data.endDateDisplay;
    var endDate=this.data.endDate;
    var endTimeDisplay=this.data.endTimeDisplay;
    var endTime=this.data.endTime;
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
        beginDateDisplay:beginDateDisplay,
        beginDate:beginDate,
        beginTimeDisplay:beginTimeDisplay,
        beginTime:beginTime,
        endDateDisplay:endDateDisplay,
        endDate:endDate,
        endTimeDisplay:endTimeDisplay,
        endTime:endTime,
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