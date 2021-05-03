module.exports = {
  roots: ["./"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  clearMocks: true,
  testPathIgnorePatterns: ["dist"],
};
