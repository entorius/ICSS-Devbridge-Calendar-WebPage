module.exports = {
    context: __dirname,
    entry: "./app.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"

    },
    watch: true,
    module: {
        rules: [
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.scss$/,
                    /\.json$/,
                    /\.bmp$/,
                    /\.gif$/,
                    /\.jpe?g$/,
                    /\.png$/,
                    /\.ejs$/,
                ],
                loader: 'file-loader',
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.js$/,
                exclude: /{node_modules}/,
                use: {

                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ["@babel/plugin-proposal-object-rest-spread", '@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                       
                    }
                ], 
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, 
                            disable: true, 
                        },
                    },
                ],
            }
        ]
    },
    performance: {
        maxEntrypointSize: 400000,
        maxAssetSize: 10000000
    }
}