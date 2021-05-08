  var courseListNoAll = [
    [' ', '  ', '请', '  ', '请', '  ', ' ', '  '],
    [' ', '  ', '选', '  ', '选', '  ', ' ', '  '],
    [' ', '  ', '择', '  ', '择', '  ', ' ', '  '],
    [' ', '  ', '年', '  ', '班', '  ', ' ', '  '],
    [' ', '  ', '级', '  ', '级', '  ', ' ', '  ']
  ];
  var courseListNoG = [
    [' ', '  ', '请', '  ', ' ', '  ', ' ', '  '],
    [' ', '  ', '选', '  ', ' ', '  ', ' ', '  '],
    [' ', '  ', '择', '  ', ' ', '  ', ' ', '  '],
    [' ', '  ', '年', '  ', ' ', '  ', ' ', '  '],
    [' ', '  ', '级', '  ', ' ', '  ', ' ', '  ']
  ];
  var courseListNoC = [
    [' ', '  ', ' ', '  ', '请', '  ', ' ', '  '],
    [' ', '  ', ' ', '  ', '选', '  ', ' ', '  '],
    [' ', '  ', ' ', '  ', '择', '  ', ' ', '  '],
    [' ', '  ', ' ', '  ', '班', '  ', ' ', '  '],
    [' ', '  ', ' ', '  ', '级', '  ', ' ', '  ']
  ];
  var courseListNoM = [
    [' ', '  ', ' ', '  ', '请', '  ', ' ', '  '],
    [' ', '  ', ' ', '  ', '选', '  ', ' ', '  '],
    [' ', '  ', ' ', '  ', '择', '  ', ' ', '  '],
    [' ', '  ', ' ', '  ', '选', '  ', ' ', '  '],
    [' ', '  ', ' ', '  ', '科', '  ', ' ', '  ']
  ];

function getCookie(cname) {
  if (typeof(Storage)!=='undefined') {
    return localStorage.getItem(cname);
  } else {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
  }
}
function setCookie(cname,cvalue) {
  if (typeof(Storage)!=='undefined') {
    localStorage.setItem(cname,cvalue);
  } else {
    var d = new Date();
    // d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + (new Date()).valueOf()+10000000000;
  }
}
  var dataLoaded = false;
  var week = window.innerWidth > 360 ? ['周一', '周二', '周三', '周四', '周五'] :
    ['一', '二', '三', '四', '五'];
  var now = new Date();
  var day = now.getDay();
  var courseType = [
    [{index: '1', name: '7:55'}, 1],
    [{index: '2', name: '8:50'}, 1],
    [{index: '3', name: '10:00'}, 1],
    [{index: '4', name: '11:00'}, 1],
    [{index: '5', name: '14:00'}, 1],
    [{index: '6', name: '15:00'}, 1],
    [{index: '7', name: '15:55'}, 1],
    [{index: '8', name: '16:50'}, 1]
  ];
  var Timetable;
  var gradeId = -1;
  var classId = -1;
  var gaoKaoMajor = -1;
  var tempGradeId = -1;
  var tempClassId = -1;
  var styles = {
    Gheight: 50,
    // 改课表颜色
    // palette: ['#cbacac', '#cbb4ac', '#cbbbac', '#cbc3ac', '#cbcbac', '#c3cbac', '#bbcbac', '#b4cbac', '#accbac', '#accbb4', '#accbbb', '#accbc3', '#accbcb', '#acc3cb', '#acbbcb','#acb4cb','#acaccb','#b4accb','#bbaccb','#c3accb','#cbaccb','#cbacc3','#cbacbb','#cbacb4','#cbacac']
  }
  // if IE
function IEContentLoaded (w, fn) {
  var d = w.document, done = false,
  // only fire once
  init = function () {
      if (!done) {
          done = true;
          fn();
      }
  };
  // polling for no errors
  (function () {
      try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left');
      } catch (e) {
          setTimeout(arguments.callee, 50);
          return;
      }
      // no errors, fire
      init();
  })();
  // trying to always fire before onload
  d.onreadystatechange = function() {
      if (d.readyState == 'complete') {
          d.onreadystatechange = null;
          init();
      }
  };
}

function ref(){
  // alert(gradeId+"\n"+classId+"\n"+gaoKaoMajor);
  if (gradeId == -1) {
    if (classId == -1) {    
      Timetable.setOption({
      timetables: courseListNoAll,
      week: week,
      styles: styles,
      timetableType: courseType,
      gridOnClick: function (e) {}
    });} else {
      Timetable.setOption({
        timetables: courseListNoG,
        week: week,
        styles: styles,
        timetableType: courseType,
        gridOnClick: function (e) {}
      });
    }
  } else if (classId == -1) {
    Timetable.setOption({
      timetables: courseListNoC,
      week: week,
      styles: styles,
      timetableType: courseType,
      gridOnClick: function (e) {}
    });
  } else {
    if (gaoKaoMajorList[gradeId][classId].length == 1){
      document.getElementById('gaokao_major').style="display:none;";
      Timetable.setOption({
        timetables: courseList[gradeId][classId],
        week: week,
        styles: styles,
        timetableType: courseType,
        gridOnClick: function (e) {
          if (e.name == '') {
            alert("这一节没有课哦");
          } else {
            alert(e.name + '  ' + e.week + ', 第' + e.index + '节课, 课长' + e.length + '节');
          }
          console.log(e);
        }
      });
      setCookie("gradeId",gradeId);
      setCookie("classId",classId);
      setCookie("gaoKaoMajor",gaoKaoMajor);
      setCookie("hasData",true);
    } else {
      document.getElementById('gaokao_major').style="display:inline;";
      if (tempClassId != classId || tempGradeId != tempGradeId) {
        tempClassId = classId;
        tempGradeId = gradeId;
        gaoKaoMajor = -1;
        var majorSel = document.querySelector('#gaoKaoSel');
        majorSel.options.length = 0;
        majorSel.options.add(new Option("请选择科目",-1))
        gaoKaoMajorList[gradeId][classId].forEach(element => {
          majorSel.options.add(new Option(element,majorSel.options.length-1))
        });
      }
        if (gaoKaoMajor != -1){
          Timetable.setOption({
            timetables: courseList[gradeId][classId][gaoKaoMajor],
            week: week,
            styles: styles,
            timetableType: courseType,
            gridOnClick: function (e) {
              if (e.name == '') {
                alert("这一节没有课哦");
              } else {
                alert(e.name + '  ' + e.week + ', 第' + e.index + '节课, 课长' + e.length + '节');
              }
              console.log(e);
            }
          });
          setCookie("gradeId",gradeId);
          setCookie("classId",classId);
          setCookie("gaoKaoMajor",gaoKaoMajor);
          setCookie("hasData",true);
        } else {
          Timetable.setOption({
            timetables: courseListNoM,
            week: week,
            styles: styles,
            timetableType: courseType,
            gridOnClick: function (e) {}
          });
        }
    }
  }

}
function loadFromCookie() {
  if (getCookie("hasData")) {
    if (dataLoaded) {
    gradeId = getCookie("gradeId");
    document.getElementById("gradeSel").value=gradeId;
    classId = getCookie("classId");
    document.getElementById("classSel").value=classId;
    gaoKaoMajor = getCookie("gaoKaoMajor");
    document.getElementById("gaoKaoSel").value=gaoKaoMajor;
      ref();
    } else {
      setTimeout("loadFromCookie();",500);
    }
  }
}
IEContentLoaded(window,function () {
  console.log('Main Schedule Loading...');
  Timetable = new Timetables({
    el: '#coursesTable',
    timetables: courseListNoAll,
    week: week,
    timetableType: courseType,
    highlightWeek: day,
    gridOnClick: function (e) {},
    styles: styles
  });
  console.log('Main Schedule Loaded.');
  loadFromCookie();
});
