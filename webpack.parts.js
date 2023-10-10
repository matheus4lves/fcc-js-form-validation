const HtmlWebpackPlugin = require("html-webpack-plugin");

exports.loadJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
});

exports.loadHTML = () => ({
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
});

exports.page = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "template.html",
    }),
  ],
});

exports.loadCSS = (plugins = []) => ({
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
                plugins,
              },
            },
          },
        ],
      },
    ],
  },
});

exports.loadImages = () => ({
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
});
