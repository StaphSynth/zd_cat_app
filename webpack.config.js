const path = require("path")

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist", "assets")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["env", "react"] }
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    stats: "minimal"
  },
  externals: {
    zendesk_app_framework_sdk: 'ZAFClient'
  },
  plugins: []
}
