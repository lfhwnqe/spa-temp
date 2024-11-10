const merge = require("webpack-merge");
const argv = require("yargs-parser")(process.argv.slice(2));
const { resolve } = require("path");
const _mode = argv.mode || "development";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const _modeflag = _mode === 'production' ? true : false;
const webpackBaseConfig = {
  entry: {
    main: resolve("src/index.tsx"),
  },
  output: {
    path: resolve(process.cwd(), "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: "swc-loader",
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        include: [
          resolve(__dirname, "src"),
          resolve(__dirname, "node_modules"),
        ],
        use: [
          MiniCssExtractPlugin.loader, // 把css提出来。避免每次打包时因为js变动导致css被动变
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx", ".css"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css",
      chunkFilename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css",
      ignoreOrder: false,
    }),
  ],
};

module.exports = merge.default(webpackBaseConfig, _mergeConfig);
