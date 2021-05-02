module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
      "@babel/preset-flow",
    ],
  ],
  plugins: ["@babel/plugin-syntax-flow"],
};
