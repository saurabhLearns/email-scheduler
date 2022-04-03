const bunyan = require('bunyan');
const moment = require('moment');

const log = bunyan.createLogger({ name: "email_scheduler" });

const PromiseHandler = (promise) => promise.then((data) => [null, data])
    .catch((err) => [err]); // custom promise handler

const DateParser = (date) => {
    // TODO: add timezones support
    return date;
}

module.exports = {
    log,
    PromiseHandler,
    DateParser
}
