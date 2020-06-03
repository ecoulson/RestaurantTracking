import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import RateLimit from "express-rate-limit";
import MongoStore from "rate-limit-mongo";
import session from "express-session";
import { requestLogger } from "./lib/logging";
import APIRouterConfiguration from "./routes";
import ErrorHandlingMiddleware from "./middleware/error-handling/ErrorHandlingMiddleware";
import mongoose from "mongoose";

mongoose.set('useCreateIndex', true);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(cors());

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
    app.use(ErrorHandlingMiddleware.productionErrorHandler);
} else {
    app.use(ErrorHandlingMiddleware.devErrorHandler);
}

export default app;