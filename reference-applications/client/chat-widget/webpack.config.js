const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

let vendors = ["webcomponents-bundle.js", "custom-elements-es5-adapter.js"];
module.exports = async (env) => {
  const src = __dirname + "/src/";
  let dependcies = vendors.map((file) => path.join(src, "vendors", file));
  let entry = [...dependcies, path.resolve(src, "index.js")];

  return {
    entry,
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "chat-client.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|otf)$/,
          loader: "url-loader",
          options: { limit: 100000 },
        },
        {
          test: /\.mp3$/,
          loader: 'file-loader'
         },
      ],
    },
    externalsType: "script",
    externals: {},
    devServer: {
      contentBase: "./public",
      hot: true,
      open: true,
      // port: 3000,
      historyApiFallback: true,
      watchFiles: path.resolve(__dirname, "src"),
    },
    resolve: {
      extensions: ["", ".js", ".jsx"],
      fallback: { buffer: false },
      alias: {
        "@mui/styled-engine": "@mui/styled-engine-sc",
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html",
        minify: false
      }),
      
      new RemovePlugin({
        before: {
          include: [
              './public/index.html','./public/chat-client.js.LICENSE.txt','./public/chat-client.js'
          ]
        },
  
        after: {
          root: './public',
          include: [
            'chat-client.js.LICENSE.txt'
          ],
          trash: true
        }      
      }),
      // new BundleAnalyzerPlugin()
    ],
    optimization: {
      minimizer: [new TerserPlugin({
        extractComments: false,
      })],
    },
  };
};
