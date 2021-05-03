export const get = (weatherType: string) => {
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
