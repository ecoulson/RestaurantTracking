import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import RateLimit from "express-rate-limit";
import MongoStore from "rate-limit-mongo";
import session from "express-session";
import { requestLogger, logger } from "./lib/logging";
import APIRouterConfiguration from "./routes";
import ErrorHandlingMiddleware from "./middleware/error-handling/ErrorHandlingMiddleware";
import mongoose from "mongoose";
import TokenManager from "./services/Token/TokenManger";
import mongoSanitize from "express-mongo-sanitize"

mongoose.set('useCreateIndex', true);

const OneHour = 60 * 60 * 1000;
const tokenManager = new TokenManager();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(cors());
app.use(mongoSanitize())

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

app.use("/api", new APIRouterConfiguration({}).setup());
app.get('*', (req, res) => {                       
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));                               
});

if (process.env.NODE_ENV !== "development") {
    app.use(ErrorHandlingMiddleware.productionErrorHandler);
} else {
    app.use(ErrorHandlingMiddleware.devErrorHandler);
}

clearTokens();
setInterval(clearTokens, OneHour);

async function clearTokens() {
    try {
        await tokenManager.run();
        logger.info("Cleared expired tokens");
    } catch (error) {
        logger.error("Failed to clear expired tokens");
    }
}

export default app;