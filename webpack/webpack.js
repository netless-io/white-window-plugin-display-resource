const paths = require("./paths");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    entry: [paths.entryFile],

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },
        ],
    },

    externals: {
        "white-web-sdk": {
            root: "WhiteWebSdk",
            commonjs: "white-web-sdk",
            commonjs2: "white-web-sdk",
        },
        react: {
            root: "React",
            commonjs: "react",
            commonjs2: "react",
        },
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new ESLintPlugin({
            fix: true,
            extensions: ["ts", "tsx"],
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: paths.tsConfig,
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                    declaration: true,
                },
            },
        }),
    ],

    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },

    output: {
        filename: "index.js",
        path: paths.dist,
        libraryTarget: "umd",
        library: "DisplayStaticResource",
    },
};
