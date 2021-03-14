exports.inspectDifference = function (before, after) {
  const difference = (a, b) => {
    return Math.abs(a - b);
  };

  const diff = difference(before, after);

  if (diff >= 5 && diff < 8) {
    return 1;
  }

  if (diff >= 8 && diff < 10) {
    return 2;
  }

  if (diff >= 10) {
    return 3;
  }

  return 0;
};

exports.format = function (diff) {
  switch (diff) {
    case 0:
      return "";
    case 1:
      return "前日比の気温差が5度以上。体調を崩しやすい日 :warning:";
    case 2:
      return "前日比の気温差が8度以上。体調を崩していてもおかしくありません :bomb:";
    case 3:
      return "前日比の気温差が10度以上。体調を崩しているなら休みましょう :boom:";
    default:
      return "";
  }
};

exports.daysMax = function (json) {
  return {
    yesterday: max(listTemperatureInADay(json.yesterday)),
    today: max(listTemperatureInADay(json.today)),
    tomorrow: max(listTemperatureInADay(json.tommorow)),
  };
};

function listTemperatureInADay(day) {
  return day.map((d) => {
    return d.temp;
  });
}

function max(dayTemp) {
  return dayTemp.reduce(function (a, b) {
    return Math.max(a, b);
  });
}
