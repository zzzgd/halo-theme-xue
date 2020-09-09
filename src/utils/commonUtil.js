function dateFormat(fmt, date) {
  let ret;
  const opt = {
    'y+': date.getFullYear().toString(), // 年
    'M+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'm+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
    }
  }
  return fmt;
}

export function formatDate(datetime) {
  const date = new Date(datetime);
  return dateFormat('yyyy-MM-dd', date);
}

export function formatDate2CHN(datetime) {
  const date = new Date(datetime);
  return dateFormat('yyyy年MM月dd日', date);
}

export function getDateMonth(datetime) {
  const date = new Date(datetime);
  return dateFormat('MM', date);
}

export function getDateYear(datetime) {
  const date = new Date(datetime);
  return dateFormat('yyyy', date);
}

export function getFormatDate(datetime) {
  const date = new Date(datetime);
  return dateFormat('MM-dd', date);
}

export function formatFullDate(datetime) {
  const date = new Date(datetime);
  return dateFormat('yyyy-MM-dd HH:mm:SS', date);
}

export function obtainValueInArray(arr, k) {
  if (!arr || arr.length < 1) {
    return '';
  }
  for (let i = 0; i < arr.length; i++) {
    const { key, value } = arr[i];
    if (k === key) {
      return value;
    }
  }
}

// 获取本地缓存
export function getLocalStorage(key) {
  const exp = 60 * 60 * 1000; // 一个小时的秒数
  if (localStorage.getItem(key)) {
    const vals = localStorage.getItem(key); // 获取本地存储的值
    const dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
    // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
    const isTimed = new Date().getTime() - dataObj.timer > exp;
    let newValue = null;
    if (isTimed) {
      console.log('存储已过期');
      localStorage.removeItem(key);
      return null;
    } else {
      newValue = dataObj.val;
    }
    return newValue;
  } else {
    return null;
  }
}

export function isQuotaExceeded(e) {
  let quotaExceeded = false;
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true;
          break;
        case 1014: // Firefox
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true;
          }
          break;
        default:
          break;
      }
    } else if (e.number === -2147024882) {
      // IE8
      quotaExceeded = true;
    }
  }
  return quotaExceeded;
}

export function setLocalStorage(key, value) {
  const curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列
  const valueDate = JSON.stringify({
    val: value,
    timer: curtime,
  });
  try {
    localStorage.removeItem(key);
    localStorage.setItem(key, valueDate);
  } catch (e) {
    // 兼容性写法
    if (isQuotaExceeded(e)) {
      console.log('Error: 本地存储超过限制');
      localStorage.clear();
    } else {
      console.log('Error: 保存到本地存储失败');
    }
  }
}

/**
 * 判断字符串是否为空
 * @param content
 * @returns {boolean}
 */
export function isBlank(content) {
  return content === null || content === undefined || content === '';
}

/**
 * 判断对象是否为空
 * @param content
 * @returns {boolean}
 */
export function isEmpty(content) {
  if (typeof content === 'undefined' || content === null) {
    return true;
  }
  if (typeof content === 'object') {
    if (typeof content instanceof Array) {
      return content.length < 0;
    }
    return Object.keys(content).length < 1;
  } else if (typeof content === 'string') {
    return content === null || content === '';
  }
}

export function timeAgo(dateTimeStamp) {
  //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  const minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  // const halfamonth = day * 15;
  const month = day * 30;
  const now = new Date().getTime(); //获取当前时间毫秒
  const diffValue = now - dateTimeStamp; //时间差

  if (diffValue < 0) {
    return;
  }
  const minC = diffValue / minute; //计算时间差的分，时，天，周，月
  const hourC = diffValue / hour;
  const dayC = diffValue / day;
  const weekC = diffValue / week;
  const monthC = diffValue / month;
  let result;
  if (monthC >= 1 && monthC <= 3) {
    result = ' ' + parseInt(monthC) + '月前';
  } else if (weekC >= 1 && weekC <= 4) {
    if (weekC > 4) {
      result = ' ' + Math.floor(weekC) + '周前';
    } else {
      result = ' ' + parseInt(weekC) + '周前';
    }
  } else if (dayC >= 1 && dayC <= 6) {
    result = ' ' + parseInt(dayC) + '天前';
  } else if (hourC >= 1 && hourC <= 23) {
    result = ' ' + parseInt(hourC) + '小时前';
  } else if (minC >= 1 && minC <= 59) {
    result = ' ' + parseInt(minC) + '分钟前';
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = '刚刚';
  } else {
    var datetime = new Date();
    datetime.setTime(dateTimeStamp);
    var Nyear = datetime.getFullYear();
    var Nmonth = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
    var Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours();
    var Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
    var Nsecond = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
    result = Nyear + '/' + Nmonth + '/' + Ndate + ' ' + Nhour + ':' + Nminute + ':' + Nsecond;
  }
  return result;
}

export function archivePhotos(data) {
  if (isEmpty(data)) {
    return [];
  }
  let c = [];
  let d = {};
  data.forEach(element => {
    if (!d[element.team]) {
      c.push({
        team: element.team,
        photos: [element],
      });
      d[element.team] = element;
    } else {
      c.forEach(ele => {
        if (ele.team === element.team) {
          ele.photos.push(element);
        }
      });
    }
  });
  return c;
}

// 特殊字符转义成HTML标签
export function decodeHTML(html) {
  var output,
    elem = document.createElement('div');
  elem.innerHTML = html;
  output = elem.innerText || elem.textContent;
  elem = null;
  return output;
}
