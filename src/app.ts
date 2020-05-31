import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import RateLimit from "express-rate-limit";
import MongoStore from "rate-limit-mongo";
import session from "express-session";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { errorHandler, devErrorHandler } from "./middleware/error-handling";
import { requestLogger, logger } from "./lib/logging";
import APIRouterConfiguration from "./routes";
import RestaurantRouteConfiguration from "./routes/Restaurant/RestaurantRouteConfiguration";
import CheckInRouteConfiguration from "./routes/CheckIn/CheckInRouteConfiguration";
import RestaurantController from "./controllers/Restaurant/RestaurantController";

const config = require('../webpack.config');

const app = express();
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
    
    app.use(requestLogger)
    app.use(helmet());
}

if (process.env.NODE_ENV === "production") {
    const limiter = RateLimit({
        store: new MongoStore({
            uri: process.env.CONNECTION_STRING,
            collectionName: "rate-records"
        }),
        max: 100,
        windowMs: 60 * 1000
    });
    
    app.use(limiter)
}

app.use("/", express.static(path.join(__dirname, '..', 'client', 'build')));
app.use("/", new APIRouterConfiguration({}).setup());


if (process.env.NODE_ENV !== "development") {
    app.use(errorHandler);
} else {
    app.use(devErrorHandler);
}

export default app;