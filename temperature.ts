import { DaysWeather, DayWeather } from "./Types/zutool";

export function diffMessage(days: DaysWeather, isTomorrow: boolean) {
  const daysMaxTemp = daysMax(days);
  const tempDiffLevel = isTomorrow
    ? inspectDifference(daysMaxTemp.today, daysMaxTemp.tomorrow)
    : inspectDifference(daysMaxTemp.yesterday, daysMaxTemp.today);
  return format(tempDiffLevel);
}

export const inspectDifference = (before: number, after: number): number => {
  const difference = (a: number, b: number) => {
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

export const format = (diff: number) => {
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

export const daysMax = (days: DaysWeather) => {
  return {
    yesterday: max(listTemperatureInADay(days.yesterday)),
    today: max(listTemperatureInADay(days.today)),
    tomorrow: max(listTemperatureInADay(days.tommorow)),
  };
};

function listTemperatureInADay(day: DayWeather): number[] {
  return day.map((d) => {
    return d.temp;
  });
}

function max(dayTemp): number {
  return dayTemp.reduce(function (a, b) {
    return Math.max(a, b);
  });
}
