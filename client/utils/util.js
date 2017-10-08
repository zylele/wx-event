const B_C = "公元前";
const A_D = "公元";

const weeks = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

const formatTime = date => {
  var ADOrBC = "";
  var year = date.getFullYear();

  /**
   * 判断公元前还是公元后
   * 公元没有0年，只有公元1年
   * 所以公元前的在数字上应往前推算一年
   */
  if (year > 0) {
    ADOrBC = A_D;
  } else {
    year--;
    year = Math.abs(year);
    ADOrBC = B_C;
  }
  
  year = year.toString();
  while (!year[3]) {
    year = "0" + year;
  }

  var month = date.getMonth() + 1;
  month = month.toString();
  month = month[1] ? month : "0" + month;

  var day = date.getDate();
  day = day.toString();
  day = day[1] ? day : "0" + day;

  return new Array(ADOrBC, [year, month, day].join('-'), weeks[date.getDay()]);
};

module.exports = {
  formatTime: formatTime
}
