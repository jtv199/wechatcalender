WeChat calender
<a name="introduction"></a>
_Shanghai Jiao Tong alender_ is a calender mini-app for WeChat, works inside the WeChat app. Built for Shanghai Jiao Tong university's club system.

Functionalities include:
- Class management: User is able to add, modify, delete and display their class schedules and details.
- Activities management: User is able to add, modify, delete, set notifications, follow clubs and display their club activities.
- User customisation : User is able to individualise their personal info, navigation and other details.

# Table of Contents
1. [Introduction](#introduction)
2. [Chinese introduction](#chinese-introduction)
3. [App demonstration](#demonstration)
3. Technical diagrams / 类图
    1. [Use case diagram / 用例图](#usecase)
    2. [Adapters UML diagram/ 用户接口类图](#adapters)
    3. [Activities management UML diagram/ 活动管理包类图](#activities)
    4. [Sequence diagram/ 活动管理包类图](#sequence)




交大日历
----
<a name="chinese-introduction"></a>
功能介绍
- 课程管理 ： 实现添加、修改、删除课程，以及显示课程表，查看详细课程信息等。
- 活动管理 ： 实现添加、修改、删除活动，查看日程表和详细活动信息，设置活动提醒，关注校园活动等。
- 个人定制 ： 个人中心，对个人信息进行个性化定制，导航服务，以及一些应用设置。

App demonstration
----
<a name="demonstration"></a>



Use case diagram / 用例图
---

<a name="usecase"></a>
![use case diagram](https://i.imgur.com/WlnX4Mf.png)

Adapters UML diagram/ 用户接口类图
---

<a name="adapters"></a>
![UML](https://i.imgur.com/tvreSmk.png)

Activities management UML diagram/ 活动管理包类图
---
<a name="activities"></a>
![Imgur](https://i.imgur.com/jPQ3H1N.png)

Sequence diagram/ 活动管理包类图
---
<a name="sequence"></a>
![Imgur](https://i.imgur.com/pTj8w6z.png)
![Imgur](https://i.imgur.com/RXwaWfC.png)

How to store activities and classes / 课程和活动各自的时间保存方式
---

The main difference between how activities and classes are stored is the date formate. Classes have the period, weekday, and week numbers. While activities have date, start and end time. For speed of retrieval, classes and activities are stored in weeks.


课程和活动主要区分在于时间的格式。课程时间包含课时（第几节），星期几和周次。而活动则包含日期、开始时间、结束时间（具体到分）（这是课程表和日程表显示的格式不同所致）。为了能够快速得到各周的所有课程，我们对同一门课程每一周都进行了一次保存。这样可以快速查询出每周的所有课程。而对于日期，我们对日期和时间进行了两种形式的保存，一种是字符串形式（2019-1-1、10：30），这种格式用于显示。而另一种是转为int型（20190101、1030）这种格式便于查询和判断时间冲突。






