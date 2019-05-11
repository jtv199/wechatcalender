// miniprogram/pages/courseInfo/courseInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseName:'',
    courseSite:'',
    courseTime:null,
    array:['东上院','东中院','东下院','上院','中院','下院'],
    index:0
  },

  bindPickerChange:function(e){
    this.setData({
      index:e.detail.value
    })
  },

  courseNameInput:function(e){
    this.setData({
      courseName:e.detail.value
    })
  },

  courseSiteInput:function(e){
    this.setData({
      courseSite:e.detail.value
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