require("dotenv").config()
import app from "./app";
import { logger } from "./lib/logging";
import mongoose from "mongoose";

main();

async function main() {
    configure();
    await connectToDatabase();
    startServer();
}

function configure() {
    if (process.env.REVIEW_APP) {
        process.env.HOST_NAME = `restaurant-records-pr-${process.env.HEROKU_PR_NUMBER}.herokuapp.com`;
        process.env.COOKIE_DOMAIN = `restaurant-records-pr-${process.env.HEROKU_PR_NUMBER}.herokuapp.com`;
    }
}

async function connectToDatabase() {
    try {
        if (!process.env.CONNECTION_STRING) {
            logger.error("Connection string not present in the environment");
            throw new Error("Connection string not present in the environment")
        }
        await mongoose.connect(process.env.CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        logger.info("Successfully connected to database");
    } catch (error) {
        throw error;
    }
}

function startServer() {
    app.listen(process.env.PORT, () => {
        logger.info(`Listening at http://${process.env.HOST_NAME}:${process.env.PORT}`);
    })
}