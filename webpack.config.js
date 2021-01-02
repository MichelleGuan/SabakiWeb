const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const history = require('connect-history-api-fallback')
const convert = require('koa-connect')

const dev = Boolean(process.env.WEBPACK_SERVE)

let noopPath = path.join(__dirname, 'src/modules/shims/noop')
let emptyPath = path.join(__dirname, 'src/modules/shims/empty')

module.exports = (env, argv) => ({
    entry: './src/components/App.js',

    output: {
        filename: 'bundle.js',
        path: __dirname
    },

    devServer: {
        historyApiFallback: true
	},

    devtool: argv.mode === 'production' ? false : 'cheap-module-eval-source-map',

    node: {
        Buffer: false
    },

    node: {
        __dirname: false
    },

    // module: {
    //     rules: [
    //         {
    //             test: /\.css$/,
    //             use: [
    //                 'style-loader',
    //                 'css-loader'
    //             ]
    //         },
    //         {
    //             test: /\.(png|svg|jpg|gif)$/,
    //             use: [
    //                 'file-loader'
    //             ]
    //         },
    //         {
    //             test: /\.js$/,
    //             exclude: /(node_modules|bower_components)/,
    //             use: {
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: ['@babel/preset-env']
    //                 }
    //             }
    //         },
    //         {
    //             test: /\.(html)$/,
    //             use: {
    //                 loader: 'html-loader'
    //             }
    //         },
    //         {
    //             test: /\.(scss)$/,
    //             use: [{
    //                 loader: 'style-loader'
    //             }, {
    //                 loader: 'css-loader'
    //             }, {
    //                 loader: 'postcss-loader',
    //                 options: {
    //                     postcssOptions: {
    //                         plugins: function () {
    //                             return [
    //                                 require('autoprefixer')
    //                             ];
    //                         }
    //                     }
    //                 }
    //             }, {
    //                 loader: 'sass-loader'
    //             }]
    //         },
    //         {
    //             test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
    //             use: [
    //               {
    //                 loader: 'url-loader'
    //               }
    //             ]
    //           }
    //     ]
    // },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //       template: './index.html',
    //       chunksSortMode: 'none'
    //     })
    // ],

    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules/preact/dist/preact.min'),
            'preact': path.join(__dirname, 'node_modules/preact/dist/preact.min'),
            'prop-types': path.join(__dirname, 'src/modules/shims/prop-types'),
            'fs': path.join(__dirname, 'src/modules/shims/fs'),
            'util': path.join(__dirname, 'src/modules/shims/util'),
            'electron': path.join(__dirname, 'src/modules/shims/electron'),
            'buffer': path.join(__dirname, 'src/modules/shims/buffer'),
            '@sabaki/boardmatcher': path.join(__dirname, 'src/modules/shims/boardmatcher'),
            'character-entities': emptyPath,
            'character-entities-html4': emptyPath,
            'character-entities-legacy': emptyPath,
            'character-entities-invalid': emptyPath,
            'character-reference-invalid': emptyPath,
            'moment': emptyPath,
            'uuid/v1': noopPath,
            'recursive-copy': noopPath,
            'rimraf': noopPath,
            'argv-split': noopPath,
            '@sabaki/gtp': emptyPath,
            '../modules/enginesyncer': emptyPath,
            '../modules/gtplogger': path.join(__dirname, 'src/modules/shims/gtplogger'),
            '../modules/treetransformer': emptyPath,
            './i18n': path.join(__dirname, 'src/modules/shims/i18n'),
            '../i18n': path.join(__dirname, 'src/modules/shims/i18n'),
            '../../i18n': path.join(__dirname, 'src/modules/shims/i18n'),
            '../menu': emptyPath,

            './ThemeManager': noopPath,
            './LeftSidebar': noopPath,
            './GtpConsole': noopPath,
            './TextSpinner': noopPath,
            '../TextSpinner': noopPath,
            './drawers/AdvancedPropertiesDrawer': noopPath,
            './drawers/PreferencesDrawer': noopPath,
            './drawers/CleanMarkupDrawer': noopPath,
            './bars/AutoplayBar': noopPath,
            './bars/GuessBar': noopPath
        }
    },

    externals: {
        'moment': 'null',
        'iconv-lite': 'null',
        'jschardet': 'null'
    }
})
if (dev) {
    module.exports.serve = {
      port: 8080,
      add: app => {
        app.use(convert(history()))
      }
    }
  }
