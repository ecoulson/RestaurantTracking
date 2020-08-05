import express, { Request } from "express";
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
import ErrorHandlingMiddleware from "./middleware/ErrorHandling/ErrorHandlingMiddleware";
import mongoose from "mongoose";
import TokenManager from "./services/Token/TokenManger";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import NodeCron from "node-cron";
import AppBroker from "./brokers/AppBroker";
import Stripe from "stripe";
import StripeBroker from "./brokers/StripeBroker";
import CreateUsageRecordsService from "./services/App/CreateUsageRecordsService";

mongoose.set('useCreateIndex', true);

const OneHour = 60 * 60 * 1000;
const tokenManager = new TokenManager();
const app = express();
app.use(bodyParser.json({
    verify: function (req : Request, res, buf) {
        if (req.url.startsWith('/api/webhooks/')) {
            req.rawBody = buf.toString()
        }
    }
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(cors());
app.use(mongoSanitize());
app.use(compression());

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
app.use("/api", new APIRouterConfiguration().setup());
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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-03-02"
});
const appBroker = new AppBroker();
const stripeBroker = new StripeBroker(stripe);
const createUsageRecordsService = new CreateUsageRecordsService(appBroker, stripeBroker)
NodeCron.schedule('0 0 0 * * *', async () => {
    const apps = await appBroker.findAll();
    apps.forEach(async (app) => {
        await createUsageRecordsService.createUsageRecord(app);
    })
})

export default app;