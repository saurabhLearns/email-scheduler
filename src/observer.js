const { CronJob } = require('cron');
const { log } = require('../utils/utility-functions')
const { Executor } = require('./job-executor');

module.exports = () => {
    (() => new CronJob('* * * * *', () => {
        log.info(`Observer ran on =>  ${new Date()}`);
        Executor();
    }, null, true, "Europe/London")
    )();
}