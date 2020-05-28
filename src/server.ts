require("dotenv").config()
import app from "./app";
import { logger } from "./lib/logging";
import mongoose from "mongoose";

main();

async function main() {
    await connectToDatabase();
    startServer();
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