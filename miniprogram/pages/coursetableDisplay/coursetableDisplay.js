// miniprogram/pages/coursetableDisplay/coursetableDisplay.js
var util=require('../../utils/util.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    months:[31,28,31,30,31,30,31,31,30,31,30,31,30],
    array: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    index:0,
    month:0,
    day:0,
    year:0,
    week:0,
    initial:57,
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    courses:[]

  },
  showCardView:function(e){
    var courseId=e.currentTarget.dataset.courseid;
    console.log(courseId);
    wx.redirectTo({
      url:'../showcourse/showcourse?courseId='+courseId,
    })


  },
  
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      week:e.detail.value+1
    })
    wx.cloud.init({
      env: 'jstu-calendar-bcbe6b',
      traceUser: true
    });
    const db = wx.cloud.database();
    db.collection('courseInformation').where({
      week: this.data.week
    }).get().then(res => {
      console.log(res.data);
      this.setData({
        courses: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var userId = app.appData.userId.userId;
    console.log('onLoad');
    var time=util.formatTime(new Date());
    console.log(time);
    var day=0;
    var week=0;
    for (var i=0;i<time[1]-1;++i){
      day=day+this.data.months[i];
    }
    day=day+time[2]-this.data.initial;
    week=1+day%7;
    this.setData({
      userId:userId,
      year:time[0],
      month:time[1],
      day:time[2],
      week:week,
      index:week-1

    })
    wx.cloud.init({
      env: 'jstu-calendar-bcbe6b',
      traceUser: true
    });
    
    
    const db = wx.cloud.database();
    db.collection('courseInformation').where({
      week:week,
      userId:userId
    }).get().then(res=>{
      console.log(res.data);
      this.setData({
        courses:res.data,
        userId:userId
      })
    })

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