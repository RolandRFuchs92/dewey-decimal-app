import appSettings from 'appSettings';
const {createLogger, format, transports} = window.require('winston');

const getLabel = function (callingModule) {
  const parts = callingModule.filename.split('/');
  return parts[parts.length - 2] + '/' + parts.pop();
};

const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
    ),
    // defaultMeta: { service: 'your-service-name' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `quick-start-combined.log`.
      // - Write all logs error (and below) to `quick-start-error.log`.
      //
      new transports.File({ filename: `${appSettings.appName}.error.log`, level: 'error' }),
      new transports.File({ filename: `${appSettings.appName}.general.log`})
    ]
});


if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }));
  }

const error = (errorObject) => {
    logger.error(new Error(errorObject));
}

const info = (message) => {
    logger.info(message);
}

const warn = (message) => {
    logger.warn(new Error(message));
}


export default  {
        error,
        info,
        warn
}