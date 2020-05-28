import * as expressWinston from "express-winston";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, colorize } = format;

const loggerFormat = printf(({ level, message, label, timestamp }) => {
    try {
        return `${timestamp} [${label}] ${level}: ${JSON.stringify(message, null, 2)}`;    
    } catch (error) {
        return `${timestamp} [${label}] ${level}: ${message}`;    
    }
});

const logger = createLogger({
    transports: getTransports(),
    level: process.env.LOG_LEVEL,
    format: combine(
        label({ label: 'Server' }),
        timestamp(),
        colorize(),
        loggerFormat
    )
});

function getTransports() {
    if (process.env.NODE_ENV === "development") {
        return [
            new transports.Console()
        ]
    }
    if (process.env.NODE_ENV === "production") {
        return [
            new transports.Console(),
            new transports.File({
                dirname: "../../../",
                filename: "log"
            })
        ]
    }
    return [
        new transports.Console({
            silent: true
        })
    ];
}

const requestFormat = printf(({ level, label, timestamp, meta }) => {
    return `${timestamp} [${label}] ${level}: ${JSON.stringify(meta, null, 2)}`;    
});

const requestLogger = expressWinston.logger({
    transports: [
        new transports.Console()
    ],
    format: combine(
        label({ label: 'Server' }),
        timestamp(),
        colorize(),
        requestFormat
    )
})

export {
    logger,
    requestLogger
};