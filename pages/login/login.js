// miniprogram/pages/login/login.js
var util = require('../../utils/util.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindName:'',
    bindPassword:'',
    userName:'',
    userPhoneNumber:'',
    userEmail:'',
    userId:'',
    iconPath:'',
    festivalDate:'',
    festivalName:'',
    festivalWish:'',
    festivalIntroduction:'',
    pictureSource:''
  },

  registerTap:function(){
    wx.redirectTo({
      url: '../registration/registration',
    })
  },

  bindNameInput:function(e){
    this.setData({
      bindName:e.detail.value
    })
  },

  bindPasswordInput:function(e){
    this.setData({
      bindPassword:e.detail.value
    })
  },

  bindingSuccess:function(){
    var that=this;
    var bindName=that.data.bindName;
    var bindPassword=that.data.bindPassword;
    if(bindName.length===0 || bindPassword.length===0){
      wx.showToast({
        title: '请完善登录信息',
        icon:'none',
        duration:2000,
        mask:true
      })
    }
    else{
      wx.cloud.init({
        env:'jstu-calendar-bcbe6b',
        traceuser:true
      })
      const db = wx.cloud.database();
      db.collection('userInformation').where({
        userName:bindName
      }).get().then(res=>{
        console.log(res.data);
        if(res.data[0].userPassword===bindPassword){
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000,
            mask: true
          })
          console.log('登录成功');
          that.setData({
            userName:res.data[0].userName,
            userPhoneNumber:res.data[0].userPhoneNumber,
            userEmail:res.data[0].userEmail,
            userId:res.data[0]._id,
            iconPath:res.data[0].iconPath
          })
          app.appData.userInfo={
            userPhoneNumber:that.data.userPhoneNumber,
            userEmail:that.data.userEmail
          }
          app.appData.account={
            userName:that.data.userName
          }
          app.appData.userId={
            userId:that.data.userId
          }
          app.appData.iconPath=that.data.iconPath;
          wx.switchTab({
            url: '../index/index',
          })
        }
        else{
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
            duration:2000
          })
        }
      }

      )
    }

  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that=this;
    var time = util.formatTime(new Date());
    var month = time[1];
    var day = time[2];
    var date = month * 100 + day;
    console.log(date)
    wx.cloud.init({
      env: 'jstu-calendar-bcbe6b',
      traceuser: true
    })
    const db = wx.cloud.database();

    db.collection('solarCalendarFestival').where({
      festivalDate: date
    }).get({
      success: res => {
        console.log(res.data);
        that.setData({
          festivalDate: res.data[0].festivalDate,
          festivalName: res.data[0].festivalName,
          festivalWish: res.data[0].festivalWish,
          festivalIntroduction: res.data[0].festivalIntroduction,
          pictureSource: res.data[0].pictureSource
        })
        app.appData.festivalInformation = {
          festivalDate: that.data.festivalDate,
          festivalName: that.data.festivalName,
          festivalWish: that.data.festivalWish,
          festivalIntroduction: that.data.festivalIntroduction,
          pictureSource: that.data.pictureSource
        }
      },
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