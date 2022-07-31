const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const ASSETS_DIR = path.resolve('./assets');
const NODE_MODULES = path.resolve('./node_modules');
const BUILD_DIR = ASSETS_DIR + '/build';
const JS_DIR = ASSETS_DIR + '/js';
const CSS_DIR = ASSETS_DIR + '/scss';

const config = {
    entry : {
        main: [
            NODE_MODULES + '/owl.carousel/dist/owl.carousel.min.js',
            JS_DIR + '/jquery.validate.min.js',
            JS_DIR + '/masonry.pkgd.min.js',
            JS_DIR + '/jquery.magnific-popup.js',
            JS_DIR + '/modernizr-3.11.2.min.js',
            JS_DIR + '/jquery.lazy.min.js',
            JS_DIR + '/main.js',
        ],
        '../css/main': [CSS_DIR + '/main.scss', NODE_MODULES + '/font-awesome/scss/font-awesome.scss'],
        '../css/style-wide': [CSS_DIR + '/main-wide.scss', NODE_MODULES + '/font-awesome/scss/font-awesome.scss'],
        '../css/style-gallery': [CSS_DIR + '/main-gallery.scss', NODE_MODULES + '/font-awesome/scss/font-awesome.scss'],
        '../css/style-left-content': [CSS_DIR + '/main-left-content.scss', NODE_MODULES + '/font-awesome/scss/font-awesome.scss'],
        '../css/style-right-content': [CSS_DIR + '/main-right-content.scss', NODE_MODULES + '/font-awesome/scss/font-awesome.scss'],
        '../css/style-boxed': [CSS_DIR + '/main-boxed.scss', NODE_MODULES + '/font-awesome/scss/font-awesome.scss'],
    },
    output : {
        filename : '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path : BUILD_DIR + '/js/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [ JS_DIR ],
                exclude: [
                    /node_modules/,
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: "compressed",
                            },
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../css/[name].min.css",
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
}

module.exports = config;