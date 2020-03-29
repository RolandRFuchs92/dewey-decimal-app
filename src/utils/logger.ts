import appSettings from 'appSettings.json';
const { createLogger, format, transports } = window.require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  // defaultMeta: { service: 'your-service-name' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new transports.File({
      filename: `${appSettings.logs.error}`,
      level: 'error'
    }),
    new transports.File({ filename: `${appSettings.logs.general}` })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  );
}

const error = (errorObject: string) => {
  logger.error(new Error(errorObject));
};

const info = (message: string) => {
  logger.info(message);
};

const warn = (message: string) => {
  logger.warn(new Error(message));
};

export default {
  error,
  info,
  warn
};
