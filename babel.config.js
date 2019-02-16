module.exports = {
  presets: [
    ["@babel/preset-env", {
      useBuiltIns: "entry"
    }]],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/proposal-export-default-from",
    "@babel/plugin-proposal-private-methods", 
  ]
};
