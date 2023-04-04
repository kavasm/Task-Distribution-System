require('winston-daily-rotate-file');
import config from './loggerConfig.json';

const winston = require('winston');
const fs = require('fs');
const path = require('path');
const rootPath = path.normalize(__dirname + '/..');

winston.loggers.add('logger', {
  transports: [
    // to log all the levels in the console
    new (winston.transports.Console)(
      {
        colorize: true,
        level: config.debugLogLevel
      }),

    // new files will be generated each day, the date patter indicates the frequency of creating a file.
    new winston.transports.DailyRotateFile({
      datePattern: config.datePattern,
      filename: config.debugLogFileName,
      level: config.debugLogLevel,
      maxFiles: config.maxFiles,
      name: 'debug-log',
      prepend: true
    }
    ),
    new (winston.transports.DailyRotateFile)({
      datePattern: config.datePattern,
      filename: config.errorLogFilename,
      level: config.errorLogLevel,
      maxFiles: config.maxFiles,
      name: 'error-log',
      prepend: true,
    })
  ]
});

// creates a directory if the directory is not present
exports.createLogDirectory = () => {
  if (!fs.existsSync(config.logDirectory)) {
    fs.mkdirSync(config.logDirectory);
  }
};
const logger = winston.loggers.get('logger');
Object.defineProperty(exports, 'LOG', { value: logger });
