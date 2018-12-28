var webpack = require('webpack');
var path = require('path');

process.env.UV_THREADPOOL_SIZE = 100;

const HtmlWebPackPlugin = require("html-webpack-plugin");

const clientHtmlPlugin = new HtmlWebPackPlugin({
  template: path.resolve(__dirname, "client/index.html"),
  filename: path.resolve(__dirname, "www/index.html"),
  chunks: ['client'],
});

const isProd = process.env.NODE_ENV === 'production'

const freeVarsPlugin = new webpack.DefinePlugin({
  '__DEV__': JSON.stringify(!isProd)
})

let config = {
  target: "electron-renderer",
  entry: {
    client: "./client/index.js",
  },
  output: {
    path: path.resolve(__dirname, "www"),
    filename: "[name]/js/bundle.js"
  },
  resolve: {
    modules: [ path.resolve(__dirname, "client/components"), "node_modules" ],
    extensions: ['.js', '.jsx', '.json', '.scss']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader"},
          { loader: "css-loader"},
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              outputStyle: "expanded",
              includePaths: [path.resolve(__dirname, 'client/styles')]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    clientHtmlPlugin,
    freeVarsPlugin,
  ]
}

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'cheap-source-map'
  }

  return config;
};
