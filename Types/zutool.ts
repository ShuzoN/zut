export type HourWeather = {
  time: string;
  weather: string;
  temp: number;
  pressure: string;
  pressure_level: string;
};

export type DayWeather = HourWeather[];

export type DaysWeather = {
  yesterday: DayWeather;
  today: DayWeather;
  tommorow: DayWeather;
  dayAfterTommorow: DayWeather;
};

export type LocationWeatherResponse = {
  place_name: string;
  place_id: string;
  prefectures_id: string;
  dateTime: string;
  yesterday: DayWeather;
  today: DayWeather;
  tommorow: DayWeather;
  dayaftertomorrow: DayWeather;
};
