export type HourWeather = {
  time: string;
  weather: string;
  temp: string;
  pressure: string;
  pressure_level: string;
};

export type DayWeather = HourWeather[];

export type DaysWeather = {
  yesterday: DayWeather;
  today: DayWeather;
  tomorrow: DayWeather;
  dayAfterTomorrow: DayWeather;
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

export type LocationSearchResponse = {
  result: string;
};

export type SearchLocation = {
  city_code: string;
  name_kata: string;
  name: string;
};
