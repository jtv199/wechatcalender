// miniprogram/pages/showcourse/showcourse.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    months: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 30],
    courseId:'',
    oldname:'',
    oldweekday:1,
    begin1: '8:00',
    end1: '9:40',
    begin: 1,
    end: 2,
    judge: 0,
    courseName: '',
    courseSite: '',
    courseBegin: 0,
    courseEnd: 1,
    weekday: 1,
    userId: '',
    array: ['东上院', '东中院', '东下院', '上院', '中院', '下院'],
    index: 0,
    weeks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    begintime1: { '8:00': 1, '10:00': 3, '12:00': 5, '12:55': 6, '14:00': 7, '16:00': 9, '18:00': 11 },
    endtime1: { '9:40': 2, '11:40': 4, '13:40': 6, '15:40': 8, '17:40': 10, '19:40': 12, '20:30': 13 },
    begintime: ['8:00', '10:00', '12:00', '12:55', '14:00', '16:00', '18:00'],
    endtime: ['9:40', '11:40', '13:40', '15:40', '17:40', '19:40', '20:30'],
    course:{},
    courses:[]

  },
  courseNameInput(e){
    this.setData({
      courseName:e.detail.value
    })
  },
  courseSiteInput(e){
    this.setData({
      courseSite:e.detail.value
    })
  },

  bt: function (e) {
    var k = e.detail.value;
    this.setData({
      begin1: this.data.begintime[k]

    })
    this.setData({
      begin: this.data.begintime1[this.data.begin1]
    })
  },
  et: function (e) {
    var k = e.detail.value;
    this.setData({
      end1: this.data.endtime[k]

    })
    this.setData({
      end: this.data.endtime1[this.data.end1]
    })
  },
  setweeks: function (e) {
    console.log(e.detail);
    var k = e.detail.value;
    if (k == 'all') {
      this.setData({
        weeks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      })
    }
    if (k == 'even') {
      this.setData({
        weeks: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
      })
    }
    if (k == 'odd') {
      this.setData({
        weeks: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
      })
    }
    if (k == 'own') {
      this.setData({
        weeks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      })
    }
  },

  setweekday: function (e) {
    this.setData({
      weekday: parseInt(e.detail.value)

    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  courseNameInput: function (e) {
    this.setData({
      courseName: e.detail.value
    })
  },

  courseSiteInput: function (e) {
    this.setData({
      courseSite: e.detail.value
    })
  },


modifycourse:function(e){
 
  var that = this;
  var d = that.data;
  console.log(d);
  var userId = d.userId;
  var courseName = d.courseName;
  var courseSite = d.courseSite;
  var weekday = d.weekday;
  var weeks = d.weeks
  var begin = d.begin;
  var end = d.end;
  var begintime = d.begin1;
  var endtime = d.end1;
  begintime = begintime.split(':');
  endtime = endtime.split(':');
  begintime = parseInt(begintime[0] * 100) + parseInt(begintime[1]);
  endtime = parseInt(endtime[0]) * 100 + parseInt(endtime[1]);
  wx.cloud.init({
    env: 'jstu-calendar-bcbe6b',
    traceUser: true
  });
  const db = wx.cloud.database();
  db.collection('courseInformation').where({
    courseName:d.course.courseName,
    weekday:d.course.weekday,
    userId:d.userId
  }).get().then(res=>{
    this.setData({
      courses:res.data 
    })
  })

  for (var i=0;i<d.courses.length;++i){
  db.collection('courseInformation').doc(d.courses[i]._id).remove()}
  wx.cloud.callFunction({
    name: 'remove2',
    data:{
      a:d.course.courseName,
      b:d.course.weekday,
      c:d.userId

    },
      success(res) {
      console.log('123')
    }
  })
  var i=0;
  for (var i=0;i<16;++i){
    if (d.weeks[i]==1){
      var week=i+1;
      var months=d.months;
      var day = (week - 1) * 7 + d.weekday + 57;
      var month=0;
      for (month = 0; day > months[month]; month++) { day -= months[month] }
      month++;

      db.collection('courseInformation').add({
        data: {
          userId: userId,
          courseName: courseName,
          courseSite: courseSite,
          weekday: weekday,
          week: week,
          begin: begin,
          end: end,
          begintime: begintime,
          endtime: endtime,
          date: 20190000 + month * 100 + day,
          weeks: d.weeks,
          realbegin: d.begin1,
          realend:d.end1
        }});
        db.collection('activityInformation').add({
          data:{
            userId: userId,
            week: week,
            weekday: weekday,
            activityName: courseName,
            activitySite: courseSite,
            date: 20190000 + month * 100 + day,
            dateDisplay: '2019-' + month + '-' + day,
            beginTimeDisplay: this.data.begin1,
            endTimeDisplay: this.data.end1,
            beginTime: begintime,
            endTime: endtime
          }
        })}}
       
          wx.showToast({
            title: '课程修改成功',
            icon: 'success',
            duration: 2000,
            mask: true
          });
          wx.redirectTo({
            url: '../coursetableDisplay/coursetableDisplay',
          })
        

    },
 delete:function(e){
   
    var name;
    var weekday;
    wx.cloud.init({
      env: 'jstu-calendar-bcbe6b',
      traceUser: true
    });
    var that=this;
    var d=this.data;
   wx.showModal({
     title: '提示',
     content: '是否删除课程',
     success: function (re) {
       if (re.confirm) {
    const db = wx.cloud.database();
    wx.cloud.callFunction({
    name: 'remove2',
    data:{
      a:d.course.courseName,
      b:d.course.weekday,
      c:d.userId

    },
      success(res) {
      console.log('123')
    }
  })
         
   db.collection('courseInformation').where({
     courseName:d.course.courseName,
     weekday: d.course.weekday,
     userId:d.userId
   }).get().then(res =>{
     that.setData({
       courses: res.data
     })
   })
   for(var i=0;i<d.courses.length;++i){
    db.collection('courseInformation').doc(d.courses[i]._id)
    .remove({
            success: function (res) {
              console.log(res.data)
              wx.showToast({
                title: '课程删除成功',
                icon: 'success',
                duration: 2000,
                mask: true
              })
              wx.redirectTo({
                url: '../coursetableDisplay/coursetableDisplay',
              
            })
          }})
   
   }


  }}})},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId = app.appData.userId.userId;
    console.log('ddd'+options.courseId)
    var courseId=options.courseId;
   
    wx.cloud.init({
      env: 'jstu-calendar-bcbe6b',
      traceUser: true
    });
    const db = wx.cloud.database();
    db.collection('courseInformation').where({
      _id:courseId
    }).get().then(res => {
      console.log(res.data);
      this.setData({
        userId:userId,
        weeks:res.data[0].weeks,
        courseId:res.data[0]._id,
        begin1:res.data[0].realbegin,
        end1:res.data[0].realend,
        course:res.data[0],
        courseName:res.data[0].courseName,
        courseSite:res.data[0].courseSite
      })
     })
     

    }



  ,

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