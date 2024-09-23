import { createLogger, format, transports } from 'winston';

const createLoggerFormat = (isConsole = false) => {
    return isConsole
        ? format.combine(
            format.timestamp(),
            format.colorize(),
            format.cli()
        )
        : format.combine(
            format.timestamp(),
            format.json(),
        );
};

const createConsoleTransport = () => {
    return new transports.Console({
        format: createLoggerFormat(true),
    });
};

const createFileTransport = (filename: string, level: string = 'info') => {
    return new transports.File({
        filename,
        level,
        format: createLoggerFormat(false),
    });
};

const logger = createLogger({
    transports: [
        createConsoleTransport(),
        createFileTransport('log/portfolio-log.log'),
        createFileTransport('log/portfolio-error.log', 'error'),
    ],
});

export default logger;
