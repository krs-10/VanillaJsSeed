module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "@babel/proposal-export-default-from",
    "@babel/plugin-proposal-private-methods"
  ]
};
