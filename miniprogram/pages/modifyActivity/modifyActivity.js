// miniprogram/pages/modifyActivity/modifyActivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityId:'',
    //带default字段的为原来的活动信息
    defaultActivityName:'',
    defaultActivitySite:'',
    defaultBeginDate:'',
    defaultEndDate:'',
    defaultBeginTime:'',
    defaultEndTime:'',

    activityName: '',
    activitySite: '',
    beginDate:'',
    beginDateDisplay:'',
    beginTime:'',
    beginTimeDisplay:'',
    endDate:'',
    endDateDisplay:'',
    endTime:'',
    endTimeDisplay:''
  },

  //获取修改的活动名称
  activityNameInput: function (e) {
    this.setData({
      activityName: e.detail.value
    })
  },

  //获取修改的活动地点
  activitySiteInput: function (e) {
    this.setData({
      activitySite: e.detail.value
    })
  },

  //处理开始日期选择
  handleBeginDateChange(e) {
    console.log(e.detail.value)
    let [year, month, day] = e.detail.value.split('-')
    var beginDate = parseInt(year) * 10000 + parseInt(month) * 100 + parseInt(day)
    this.setData({
      beginDate: beginDate,
      beginDateDisplay: e.detail.value
    })
  },

  //处理开始时间选择
  handleBeginTimeChange(e) {
    let [hour, minute] = e.detail.value.split(':')
    var beginTime = parseInt(hour) * 100 + parseInt(minute)
    this.setData({
      beginTime: beginTime,
      beginTimeDisplay: e.detail.value
    })
  },

  //处理结束日期选择
  handleEndDateChange(e) {
    console.log(e.detail.value)
    let [year, month, day] = e.detail.value.split('-')
    var endDate = parseInt(year) * 10000 + parseInt(month) * 100 + parseInt(day)
    this.setData({
      endDate: endDate,
      endDateDisplay:e.detail.value
    })
  },

  //处理结束时间选择
  handleEndTimeChange(e) {
    let [hour, minute] = e.detail.value.split(':')
    var endTime = parseInt(hour) * 100 + parseInt(minute)
    this.setData({
      endTime: endTime,
      endTimeDisplay: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取要修改的活动的活动ID
    var activityId=options.activityId;
    that.setData({
      activityId:options.activityId
    })

    wx.cloud.init({
      env: 'jstu-calendar-bcbe6b',
      traceuser: true
    })
    const db = wx.cloud.database();
    db.collection('activityInformation').where({
      _id:activityId
    }).get().then(res=>{
      that.setData({
        defaultActivityName:res.data[0].activityName,
        defaultActivitySite:res.data[0].activitySite,
        defaultBeginDate:res.data[0].beginDateDisplay,
        defaultEndDate:res.data[0].endDateDisplay,
        defaultBeginTime:res.data[0].beginTimeDisplay,
        defaultEndTime:res.data[0].endTimeDisplay,
        beginDate:res.data[0].beginDate,
        beginTime:res.data[0].beginTime,
        endDate:res.data[0].endDate,
        endTime:res.data[0].endTime
      })
      that.setData({
        beginDateDisplay: that.data.defaultBeginDate,
        beginTimeDisplay: that.data.defaultBeginTime,
        endDateDisplay: that.data.defaultEndDate,
        endTimeDisplay: that.data.defaultEndTime
      })
    },
    )

      
  },
  //保存修改后的活动信息
  saveChanges:function(){
    var activityId=this.data.activityId;
    var activityName=this.data.activityName;
    var activitySite=this.data.activitySite;
    var beginDate=this.data.beginDate;
    var beginDateDisplay=this.data.beginDateDisplay;
    var beginTime=this.data.beginTime;
    var beginTimeDisplay=this.data.beginTimeDisplay;
    var endDate=this.data.endDate;
    var endDateDisplay=this.data.endDateDisplay;
    var endTime=this.data.endTime;
    var endTimeDisplay=this.data.endTimeDisplay;
    if(activityName===''){activityName=this.data.defaultActivityName;}
    if(activitySite===''){activitySite=this.data.defaultActivitySite;}
    wx.showModal({
      title: '提示',
      content: '是否修改活动信息',
      success:function(res){
        if(res.confirm){
          wx.cloud.init({
            env: 'jstu-calendar-bcbe6b',
            traceUser: true
          });
          const db = wx.cloud.database();
          db.collection('activityInformation').doc(activityId).update({
            data:{
              activityName:activityName,
              activitySite:activitySite,
              beginDate: beginDate,
              beginDateDisplay: beginDateDisplay,
              beginTime: beginTime,
              beginTimeDisplay: beginTimeDisplay,
              endDate: endDate,
              endDateDisplay: endDateDisplay,
              endTime: endTime,
              endTimeDisplay: endTimeDisplay
            }
          })
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateTo({
            url: '../scheduleDisplay/scheduleDisplay',
          })
        }
      }
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