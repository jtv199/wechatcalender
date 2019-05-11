// miniprogram/pages/registration/registration.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    userPassword:'',
    userPasswordAgain:'',
    userPhoneNumber:'',
    userEmail:'',
    iconPath:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557489263&di=8c51c44a0cd1248624100313f97e4865&imgtype=jpg&er=1&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F69ad7a731f43d4b8729f1a2fbe65c43801ca0f033250-EV1vMf_fw658'
  },

  bindingTap: function () {
    wx.redirectTo({
      url: '../login/login',
    })
  },

  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    });
  },

  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    });
  },

  userPasswordAgainInput: function (e) {
    this.setData({
      userPasswordAgain: e.detail.value
    });
  },

  userPhoneNumberInput:function(e){
    this.setData({
      userPhoneNumber:e.detail.value
    });
  },

  userEmailInput:function(e){
    this.setData({
      userEmail:e.detail.value
    });
  },

  registerSuccessTap: function (){
    var userName=this.data.userName;
    var userPassword=this.data.userPassword;
    var userPasswordAgain=this.data.userPasswordAgain
    var userPhoneNumber=this.data.userPhoneNumber;
    var userEmail=this.data.userEmail;
    var iconPath=this.data.iconPath;
    var that=this;

    if(userPassword!==userPasswordAgain){
      wx.showToast({
        title:"两次密码输入不一致",
        icon:'none',
        duration:2000,
        mask:true
      })
    }
    else{
      wx.cloud.init({
        env: 'jstu-calendar-bcbe6b',
        traceUser: true
      });
      const db = wx.cloud.database();
      db.collection('userInformation').add({
        data: {
          userName: userName,
          userPassword: userPassword,
          userPhoneNumber: userPhoneNumber,
          userEmail: userEmail,
          iconPath:iconPath
        },
        success: function (res) {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000,
            mask: true
          })
          console.log(res);
          console.log(res.errMsg);
          wx.reLaunch({
            url: '../login/login',
          })
        }
      })
    }

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