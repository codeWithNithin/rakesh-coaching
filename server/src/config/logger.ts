import winston  from "winston";
import { config } from "./index.js";

export const logger = winston.createLogger({
    level: 'info',
    defaultMeta: { service: 'simple-project' },
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.File({
            level: 'info',
            dirname: 'logs',
            filename: 'combined.log',
            silent: config.NODE_ENV === 'test',
        }),
        new winston.transports.File({
            level: 'error',
            dirname: 'logs',
            filename: 'error.log',
            silent: config.NODE_ENV === 'test',
        }),
        new winston.transports.Console({
            level: 'info',
            silent: config.NODE_ENV === 'test',
        }),
    ],
})