// miniprogram/pages/personalInfo/personalInfo.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    userPhoneNumber:'',
    userEmail:'',
    userId:'',
    newName:'',
    newPhoneNumber:'',
    newEmail:''
  },

  newNameInput:function(e){
    this.setData({
      newName:e.detail.value
    })
  },

  newPhoneNumberInput:function(e){
    this.setData({
      newPhoneNumber:e.detail.value
    })
  },

  newEmailInput:function(e){
    this.setData({
      newEmail:e.detail.value
    })
  },

  modifyPersonalInfo:function(){
    var newName=this.data.newName;
    var newPhoneNumber=this.data.newPhoneNumber;
    var newEmail=this.data.newEmail;
    var id=app.appData.userId.userId;
    if(newName===''){newName=this.data.userName}
    if(newPhoneNumber===''){newPhoneNumber=this.data.userPhoneNumber}
    if(newEmail===''){newEmail=this.data.userEmail}
    wx.cloud.init({
      env: 'jstu-calendar-bcbe6b',
      traceUser: true
    });
    const db = wx.cloud.database();
    db.collection('userInformation').doc(id).update({
      data:{
        userName:newName,
        userPhoneNumber:newPhoneNumber,
        userEmail:newEmail
      }
    })
    wx.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 2000
    })
    app.appData.account.userName=newName;
    app.appData.userInfo.userPhoneNumber=newPhoneNumber;
    app.appData.userInfo.userEmail=newEmail;
    
    wx.switchTab({
      url: '../personalCenter/personalCenter',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userName=app.appData.account.userName;
    var userPhoneNumber=app.appData.userInfo.userPhoneNumber;
    var userEmail=app.appData.userInfo.userEmail;
    var userId=app.appData.userId.userId;
    this.setData({
      userName:userName,
      userPhoneNumber:userPhoneNumber,
      userEmail:userEmail,
      userId:userId
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