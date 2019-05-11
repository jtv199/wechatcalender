// miniprogram/pages/courseInfo/courseInfo.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    begin1:'8:00',
    end1:'9:40',
    begin:1,
    end:2,
    courseName:'',
    courseSite:'',
    courseBegin:0,
    courseEnd:1,
    weekday:1,
    userId:'',
    array:['东上院','东中院','东下院','上院','中院','下院'],
    index:0,
    weeks:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    begintime1:{'8:00':1,'10:00':3,'12:00':5,'12:55':6,'14:00':7,'16:00':9,'18:00':11},
    endtime1:{'9:40':2,'11:40':4,'13:40':6,'15:40':8,'17:40':10,'19:40':12,'20:30':13},
    begintime: ['8:00', '10:00', '12:00', '12:55', '14:00', '16:00', '18:00'],
    endtime: ['9:40', '11:40', '13:40', '15:40', '17:40', '19:40', '20:30']
    
  },
  bt:function(e){
    var k=e.detail.value;
    this.setData({
      begin1:this.data.begintime[k],
      begin:this.data.begintime1[this.data.begin1]
    })
  },
  et:function(e){
    var k=e.detail.value;
    this.setData({
      end1:this.data.endtime[k],
      end:this.data.endtime1[this.data.end1]
    })
  },
  setweeks:function(e){
    console.log(e.detail);
    var k=e.detail.value;
    if (k=='all'){
      this.setData({
        weeks:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        })
    }
    if (k=='even'){
      this.setData({
        weeks:[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]
      })
    }
    if (k=='odd'){
      this.setData({
        weeks:[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
      })
    }
    if (k=='own'){
      this.setData({
        weeks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      })
    }
  },

  setweekday:function(e){
    this.setData({
      weekday:e.detail.index
    })
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
  addcourse: function () {
    var d=this.data;
    var userId=d.userId;
    var courseName=d.courseName;
    var courseSite=d.courseSite;
    var weekday=d.weekday;
    var weeks=[];
    for (var i=0;i<16;++i){
      if (d.weeks[i]==1)
       weeks.push(i+1)
    }
    var begin=d.begin;
    var end=d.end;
    var that = this;
    wx.cloud.init({
      env: 'jstu-calendar-bcbe6b',
      traceUser: true
    });
    const db = wx.cloud.database();
    db.collection('courseInformation').add({
      data: {
        userId:userId,
        courseName:courseName,
        courseSite:courseSite,
        weekday:weekday,
        weeks:weeks,
        begin:begin,
        end:end,
      },
      success: function (res) {
        wx.showToast({
          title: '课程添加成功',
          icon: 'success',
          duration: 2000,
          mask: true
        })
        console.log(res);
        console.log(res.errMsg);
      }
    })
    wx.switchTab({
      url: '../courseManagement/courseManagement',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId=app.appData.userId.userId;
    this.setData({
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