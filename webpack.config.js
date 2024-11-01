const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.tsx",
    // Add an entry point for the background script
    serviceWorker: "./background/background.ts",
    contentScript: "./content-script/src/main.tsx", // Ensure this is the correct path to your background script
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/, // Add SCSS rule
        use: [
          "style-loader", // Injects styles into DOM
          "css-loader", // Turns CSS into CommonJS modules
          "sass-loader", // Compiles Sass to CSS
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "manifest.json", to: "./" }, // Copy manifest.json to the root of dist
        {
          from: "public/images", // Only copy images from the 'public/images' folder
          to: "images", // Copy them to the 'dist/images' folder
        },
      ],
    }),
    ...getHtmlPlugins(["index"]),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js", // This will create index.js and serviceWorker.js in dist
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HTMLPlugin({
        title: "React extension",
        filename: `${chunk}.html`,
        chunks: [chunk],
      }),
  );
}
