const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const routes = require("./routes");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require('cors');
const csrf = require("csurf");
const RateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
const session = require('express-session');
const { errorHandler, devErrorHandler } = require("./middleware/error-handling");
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(cors());

if (process.env.NODE_ENV === "development") {
    config.entry.unshift('webpack-hot-middleware/client?reload=true&timeout=1000');

    //Add HMR plugin
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const compiler = webpack(config);

    //Enable "webpack-dev-middleware"
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    //Enable "webpack-hot-middleware"
    app.use(webpackHotMiddleware(compiler));
}

if (process.env.NODE_ENV !== "test") {
    app.use(session({  
        secret: process.env.COOKIE_SALT,
        key: process.env.COOKIE_ID, 
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: true,
            domain: process.env.COOKIE_DOMAIN,
            path: process.env.COOKIE_PATH,
            expires: new Date(Date.now() + 1000)
        }
    }));
    
    app.use(morgan("dev"));
    app.use(helmet());

    // app.use(csrf({ cookie: {
    //     httpOnly: true,
    //     secure: true
    // }}));
    
    // app.use((req, res, next) => {
    //     next();
    // })
}

if (process.env.NODE_ENV === "production") {
    const limiter = new RateLimit({
        store: new MongoStore({
            uri: process.env.CONNECTION_STRING,
            collectionName: "rate-records",
            user: process.env.MONGO_USER,
            password: process.env.MONGO_PASS
        }),
        max: 100,
        windowMs: 15 * 60 * 1000
    });
    
    app.use(limiter)
}

app.use("/", express.static(path.join(__dirname, '..', 'client', 'build')));
app.use("/", routes);

if (process.env.NODE_ENV !== "development") {
    app.use(errorHandler);
} else {
    app.use(devErrorHandler);
}

module.exports = app;