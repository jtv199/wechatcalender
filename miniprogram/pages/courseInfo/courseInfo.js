// miniprogram/pages/courseInfo/courseInfo.js
var app=getApp()
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    months: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 30],
  
    begin1:'8:00',
    end1:'9:40',
    begin:1,
    end:2,
    judge:0,
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
    endtime: ['9:40', '11:40', '13:40', '15:40', '17:40', '19:40', '20:30'],
    theweek:[],

    // radio weekday code
    weekdays: [
      { value: '1', title: '星期一' },
      { value: '2', title: '星期二', checked: 'true' },
      { value: '3', title: '星期三' },
      { value: '4', title: '星期四' },
      { value: '5', title: '星期五' },
    ],
    weekday: '2',

    weekselection: [
      { value: 'all', title: '全部' },
      { value: 'odd', title: '单周', checked: 'true' },
      { value: 'even', title: '双周' },
      { value: 'own', title: '特殊' },
    ],
    weekselected: 'odd'
    
    
    
  },

  //weekday code
  setweekday: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      weekday: e.detail.value
    });
  },

  bt:function(e){
    var k=e.detail.value;
    this.setData({
      begin1:this.data.begintime[k]
      
    })
    this.setData({
       begin: this.data.begintime1[this.data.begin1]})
  },
  et:function(e){
    var k=e.detail.value;
    this.setData({
      end1:this.data.endtime[k]
     
    })
    this.setData({
      end: this.data.endtime1[this.data.end1]
    })
  },
  setweeks:function(e){
    console.log(e.detail);
    var k=e.detail.value;
    this.setData({
      weekselected: e.detail.value
    });
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
      weekday:parseInt(e.detail.value)
      
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
  
  addcourse: function(e){
    var that=this;
    var d=that.data;
    console.log(d);
    var userId=d.userId;
    var courseName=d.courseName;
    var courseSite=d.courseSite;
    var weekday=d.weekday;
    var weeks=[];
    var begin=d.begin;
    var end=d.end;
    var begintime=d.begin1;
    var endtime=d.end1;
    begintime=begintime.split(':');
    endtime=endtime.split(':');
    begintime=parseInt(begintime[0]*100)+parseInt(begintime[1])
    endtime=parseInt(endtime[0])*100+parseInt(endtime[1])
    for (var i=0;i<16;++i){
      if (d.weeks[i]==1)
       weeks.push(i+1)
    }             
    var begin=d.begin;
    var end=d.end;
    var judge=0;
    
    wx.cloud.init({
      env: 'jstu-calendar-bcbe6b',
      traceUser: true
    });
    if (begintime >= endtime) {
      wx.showToast({
        title: '不合法时间',
        icon: 'warn',
        duration: 2000,
        mask: true
      })
    }
    else{
    const db = wx.cloud.database();
    const _=db.command;
    db.collection('courseInformation').where(_.or([
      {
        begin:_.and(_.gte(begin),_.lte(end)),
        weekday:weekday,
        userId:d.userId
      },
      {
        end:_.and(_.gte(begin),_.lte(end)),
        weekday:weekday,
        userId:d.userId
      }
    ])).get().then(res=>{
      for (var i=0;i<res.data.length;++i)
       {
         that.data.theweek.push(res.data[i].week)
       }
      for (var i = 0; i < that.data.theweek.length; ++i)
        if (weeks.includes(that.data.theweek[i])) {
          judge = 1;
          console.log(444444444444444);
          break;
        }
   
    
    if (judge==1){
      console.log('dddddddddddddddddddddddd')
      wx.showToast({
        title: '时间冲突',
        icon: 'warn',
        duration: 2000,
        mask: true
      })
    }
    
    else{
      
      console.log(begin);
      console.log(end);
      console.log(week);
      console.log(weeks);
      const _ =db.command;
      var months=this.data.months;
    for (var i=0;i<weeks.length;++i)
    { var week=weeks[i];
      var day=(week-1)*7+weekday+57;
      var month=0;
      for (month=0;day>months[month];month++)
      {day-=months[month]}
      month++;
      db.collection('activityInformation').add({
        data:{
          userId:userId,
          week:week,
          weekday:weekday,
          activityName:courseName,
          activitySite:courseSite,
          date:20190000+month*100+day,
          dateDisplay:'2019-'+month+'-'+day,
          beginTimeDisplay:this.data.begin1,
          endTimeDisplay:this.data.end1,
          beginTime:begintime,
          endTime:endtime
          
        }
      })
    db.collection('courseInformation').add({
      data: {
        userId:userId,
        courseName:courseName,
        courseSite:courseSite,
        weekday:weekday,
        week:week,
        begin:begin,
        end:end,
        begintime:begintime,
        endtime:endtime,
        date:20190000+month*100+day,
        weeks:this.data.weeks,
        realbegin:this.data.begin1,
        realend:this.data.end1
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
        wx.switchTab({
          url: '../courseManagement/courseManagement',
        })
      }
      
    })
    
  }
    
    }})}},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var userId=app.appData.userId.userId;
    console.log('use'+userId)
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