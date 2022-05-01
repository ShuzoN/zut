export const get = (pressureLevelType: string): string => {
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
