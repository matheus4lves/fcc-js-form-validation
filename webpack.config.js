const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postcssPlugins = [
  // Adds vendor prefixes automatically
  require("autoprefixer"),
  // Enables mixins more powerful than Sass, defined within stylesheets or in JS
  require("postcss-mixins"),
  // Supports for Sass-style variables
  require("postcss-simple-vars"),
  // Plugin to unwrap nested rules like how Sass does it
  require("postcss-nested"),
  // Inlines the stylesheets referred to by @import rules
  require("postcss-import"),
];

module.exports = {
  // Main js
  entry: "./app/assets/scripts/index.js",
  // Path to output the bundle
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  // Loaders
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: postcssPlugins,
              },
            },
          },
        ],
      },
      // Transpile JS
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  // Optimize webpack for development
  mode: "development",
  // Instructs webpack to target the web environment
  target: "web",
  // Used to quickly develop an application
  devServer: {
    // Tell webpack-dev-server where to look for files
    static: "./dist",
    // Make the server externally accessible and the localIp visible in the URL
    host: "local-ip",
    // Enable Hot Module Replacement
    hot: true,
    // Tell devServer to open the browser after the serve had been started
    open: {
      app: {
        name: "google-chrome",
        arguments: ["--incognito"],
      },
    },
    // Port
    port: 3000,
    // Watch for changes in html files
    watchFiles: ["./app/**/*.html"],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "app/template.html",
    }),
  ],
  devtool: "eval-source-map",
};
