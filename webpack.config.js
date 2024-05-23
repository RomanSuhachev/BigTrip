const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        watchFiles: ["src/**/*.js"],
        host: "0.0.0.0",
        hot: true,
        compress: true
    },
}