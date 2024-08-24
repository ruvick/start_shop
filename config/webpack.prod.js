import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FileIncludeWebpackPlugin from 'file-include-webpack-plugin-replace';
import CopyPlugin from "copy-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import fs from 'fs';
import * as path from 'path';

const srcFolder = "src";
const buildFolder = "dist";
const rootFolder = path.basename(path.resolve());

const paths = {
    src: path.resolve(srcFolder),
    build: path.resolve(buildFolder)
};

// Функция для получения всех файлов из директории
const getFiles = (dir, ext) => {
    return fs.readdirSync(dir).filter(file => file.endsWith(ext)).map(file => path.join(dir, file));
};

// Получаем все библиотеки из папки src/js/libs
const vendorFiles = getFiles(`${paths.src}/js/libs`, '.js');

// Получаем все файлы JS из папки src/js/files
const mainFiles = getFiles(`${paths.src}/js/files`, '.js');

const config = {
    mode: "production",
    entry: {
        vendor: vendorFiles,
        main: [`${paths.src}/js/app.js`, ...mainFiles]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /vendor/,
                exclude: /main/,
            }),
        ],
    },
		output: {
			path: path.join(paths.build, 'js'),
			filename: '[name].min.js',
			publicPath: '/js/',
	},
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'string-replace-loader',
                        options: {
                            search: '@img',
                            replace: '../img',
                            flags: 'g'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 0,
                            sourceMap: false,
                            modules: false,
                            url: {
                                filter: (url, resourcePath) => {
                                    if (url.includes("img") || url.includes("fonts")) {
                                        return false;
                                    }
                                    return true;
                                },
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: "expanded",
                            },
                        }
                    },
                ],
            },
        ],
    },
    plugins: [
        new FileIncludeWebpackPlugin({
            source: srcFolder,
            destination: '../',
            htmlBeautifyOptions: {
                "indent-with-tabs": true,
                'indent_size': 3
            },
            replace: [
                { regex: '../img', to: 'img' },
                { regex: '@img', to: 'img', },
                { regex: 'NEW_PROJECT_NAME', to: rootFolder }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '../css/style.css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: `${paths.src}/files`, to: `${paths.build}/files`,
                    noErrorOnMissing: true
                },
                {
                    from: `${paths.src}/favicon.ico`, to: `${paths.build}/favicon.ico`,
                    noErrorOnMissing: true
                }
            ],
        }),
    ],
    resolve: {
        alias: {
            "@scss": `${paths.src}/scss`,
            "@js": `${paths.src}/js`,
            "@img": `${paths.src}/img`
        },
    },
};

export default config;