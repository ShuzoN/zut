exports.getByWeatherType = function (weatherType) {
  if (weatherType === "100") {
    return ":sunny:";
  }
  if (weatherType === "200") {
    return ":cloud:";
  }
  if (weatherType === "300") {
    return ":umbrella:";
  }

  return ":innocent:";
};

exports.getByPressureLevel = function (pressureLevelType) {
  if (pressureLevelType === "0") {
    return ":ok:";
  }
  if (pressureLevelType === "1") {
    return ":ok:";
  }
  if (pressureLevelType === "2") {
    return ":arrow_heading_down:";
  }
  if (pressureLevelType === "3") {
    return ":warning:";
  }
  if (pressureLevelType === "4") {
    return ":bomb:";
  }

  return ":innocent:";
};