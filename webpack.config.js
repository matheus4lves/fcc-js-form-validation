const path = require("path");
const { merge } = require("webpack-merge");
const postCSSPlugins = [require("autoprefixer"), require("postcss-mixins"), require("postcss-simple-vars"), require("postcss-nested"), require("postcss-import")];

const parts = require("./webpack.parts");

const commonConfig = merge([
  {
    context: path.resolve(__dirname, "app"),
    entry: ["./assets/scripts/index.js", "./template.html"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
  },
  parts.loadHTML(),
  parts.loadJavaScript(),
  parts.page(),
  parts.loadCSS(postCSSPlugins),
  parts.loadImages(),
]);

// Customize these configurations if you need...
const config = {
  development: merge([]),
  production: merge([]),
};

module.exports = (_, argv) => {
  const mode = argv.mode;
  return merge([commonConfig, config[mode], { mode }]);
};
