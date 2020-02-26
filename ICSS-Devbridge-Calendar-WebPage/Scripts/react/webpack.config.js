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
                test: /\.js$/,
                exclude: /{node_modules}/,
                use: {

                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ["@babel/plugin-proposal-object-rest-spread"]
                    }
                }
            },

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


        ]

    }
}