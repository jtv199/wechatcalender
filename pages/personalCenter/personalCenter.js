// miniprogram/pages/personalInfo/personalInfo.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    userName:''
  },


  logOut:function(){
    app.appData.userInfo=null;
    app.appData.account=null;
    app.appData.userId=null;

    wx.reLaunch({
      url: '../login/login',
    })
    wx.showToast({
      title: '注销成功',
      icon: 'success',
      duration: 2000,
      mask: true
    })
  },

  uploadPicture:function(){
    var path='';
    var that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var id=app.appData.userId.userId;
        const filePath = res.tempFilePaths[0];
        app.appData.iconPath = res.tempFilePaths[0];
        that.setData({
          avatarUrl:app.appData.iconPath
        })
        wx.cloud.init({
          env: 'jstu-calendar-bcbe6b',
          traceUser: true
        });
        const db = wx.cloud.database();
        db.collection('userInformation').doc(id).update({
          data:{
            iconPath:app.appData.iconPath
          },
        })
        that.onLoad()
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name=app.appData.account.userName;
    var icon=app.appData.iconPath
    this.setData({
      userName:name,
      avatarUrl:icon
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
    this.onLoad()
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