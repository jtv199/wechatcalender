// miniprogram/pages/scheduleDisplay/scheduleDisplay.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year:'',
    month:'',
    day:'',
    selectedDate: '',//选中的几月几号
    selectedWeek: '',//选中的星期几
    curYear: 0,//当前年份
    curMonth: 0,//当前月份
    daysCountArr: [// 保存各个月份的长度，平年
      31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ],
    weekArr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dateList: [],
    todoList:''
  },
  //在日程显示页面点击+号添加活动
  handleAddActivity:function(){
    wx.navigateTo({
      url: '../activityInfo/activityInfo',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var today = new Date();//当前时间  
    var year = today.getFullYear();//年  
    var month = today.getMonth() + 1;//月  
    var day = today.getDate();//日  
    var i = today.getDay();//星期 
    var userId = app.appData.userId.userId;
    var list=new Array();
    var date = parseInt(year) * 10000 + parseInt(month) * 100 + parseInt(day);
    var num=0;
    this.setData({
      curYear: year,
      curMonth: month,
      selectedDate: year + '-' + month + '-' + day,
      selectedWeek: this.data.weekArr[i]

    }) 
    this.getDateList(year, month - 1);
    
    wx.cloud.init({
      env: 'jstu-calendar-bcbe6b',
      traceuser: true
    })

    const db = wx.cloud.database();
    db.collection('activityInformation').where({
      userId: userId,
      beginDate: date
    }).get().then(res => {
      //获取当日活动数量
      for (var key in res.data) {
        num++;
      }

      for (var index = 0; index < num; index++) {
        list.push({
          activityName: res.data[index].activityName,
          activitySite: res.data[index].activitySite,
          beginTimeDisplay: res.data[index].beginTimeDisplay,
          beginTime: res.data[index].beginTime,
          endTimeDisplay: res.data[index].endTimeDisplay,
          endTime: res.data[index].endTime,
          activityId:res.data[index]._id
        })
      }
      //对当天日程按开始时间排序
      var objectArraySort = function (keyName) {
        return function (objectN, objectM) {
          var valueN = objectN[keyName]
          var valueM = objectM[keyName]
          if (valueN > valueM) return 1
          else if (valueN < valueM) return -1
          else return 0
        }
      }
      list.sort(objectArraySort('beginTime'))

      that.setData({
        todoList: list
      })

    })
    
  },

  getDateList: function (year, month) {
    var that = this;
    //如果是否闰年，则2月是29日
    var daysCountArr = this.data.daysCountArr;
    if (year % 4 == 0 && year % 100 != 0) {
      // this.data.daysCountArr[1] = 29;
      daysCountArr[1] = 29;
      this.setData({
        daysCountArr: daysCountArr
      });
    }
    //第几个月；下标从0开始实际月份还要再+1  
    var dateList = [];
    // console.log('本月', that.data.daysCountArr[mon], '天');
    dateList[0] = [];
    var weekIndex = 0;//第几个星期
    for (var i = 0; i < that.data.daysCountArr[month]; i++) {
      var week = new Date(year, month, (i + 1)).getDay();
      // 如果是新的一周，则新增一周
      if (week == 0) {
        weekIndex++;
        dateList[weekIndex] = [];
      }
      // 如果是第一行，则将该行日期倒序，以便配合样式居右显示
      if (weekIndex == 0) {
        dateList[weekIndex].unshift({
          value: year + '-' + (month + 1) + '-' + (i + 1),
          date: i + 1,
          week: week
        });
      } else {
        dateList[weekIndex].push({
          value: year + '-' + (month + 1) + '-' + (i + 1),
          date: i + 1,
          week: week
        });
      }
    }
    // console.log('本月日期', dateList);
    that.setData({
      dateList: dateList
    });
  },


  selectDate: function (e) {
    var that = this;
    var userId=app.appData.userId.userId;
    var num=0;
    var itemNumber=0;
    var list=new Array();
    // console.log('选中', e.currentTarget.dataset.date.value);
    that.setData({
      selectedDate: e.currentTarget.dataset.date.value,
      selectedWeek: that.data.weekArr[e.currentTarget.dataset.date.week]
    });

    let [year,month,day]=that.data.selectedDate.split('-');
    var date = parseInt(year) * 10000 + parseInt(month) * 100 + parseInt(day)

    wx.cloud.init({
      env: 'jstu-calendar-bcbe6b',
      traceuser: true
    })
    const db = wx.cloud.database();
    db.collection('activityInformation').where({
      userId:userId,
      beginDate:date
    }).get().then(res=>{
      for (var key in res.data){
        num++;
      }

      for (var index=0;index<num;index++){
        list.push({
          activityName: res.data[index].activityName,
          activitySite: res.data[index].activitySite,
          beginTimeDisplay:res.data[index].beginTimeDisplay,
          beginTime: res.data[index].beginTime,
          endTimeDisplay:res.data[index].endTimeDisplay,
          endTime: res.data[index].endTime,
          activityId:res.data[index]._id
        })
      }
      that.setData({
        todoList:list
      })
      
    })

  },

  preMonth: function () {
    // 上个月
    var that = this;
    var curYear = that.data.curYear;
    var curMonth = that.data.curMonth;
    curYear = curMonth - 1 ? curYear : curYear - 1;
    curMonth = curMonth - 1 ? curMonth - 1 : 12;
    // console.log('上个月', curYear, curMonth);
    that.setData({
      curYear: curYear,
      curMonth: curMonth
    });

    that.getDateList(curYear, curMonth - 1);
  },

  nextMonth: function () {
    // 下个月
    var that = this;
    var curYear = that.data.curYear;
    var curMonth = that.data.curMonth;
    curYear = curMonth + 1 == 13 ? curYear + 1 : curYear;
    curMonth = curMonth + 1 == 13 ? 1 : curMonth + 1;
    // console.log('下个月', curYear, curMonth);
    that.setData({
      curYear: curYear,
      curMonth: curMonth
    });

    that.getDateList(curYear, curMonth - 1);
  },

  modify:function(e){
    var activityId=e.currentTarget.dataset.activityid;
    wx.navigateTo({
      url: '../modifyActivity/modifyActivity?activityId='+activityId,
    })
  },

  delete:function(e){
    var activityId=e.currentTarget.dataset.activityid;
    var index=e.currentTarget.dataset.activityindex;
    var that=this;
    var list=that.data.todoList;
    wx.showModal({
      title: '提示',
      content: '是否删除活动',
      success:function(res){
        if(res.confirm){
          wx.cloud.init({
            env: 'jstu-calendar-bcbe6b',
            traceuser: true
          })
          const db = wx.cloud.database();
          db.collection('activityInformation').doc(activityId).remove({
            success: function (res) {
              console.log(res.data)
              list.splice(index, 1);
              that.setData({
                todoList: list
              })
              wx.showToast({
                title: '活动删除成功',
                icon: 'success',
                duration: 2000,
                mask: true
              })
              that.onShow()
            }
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