const { PromiseHandler } = require('../utils/utility-functions')
const Constants = require('../utils/constants')
const { Mailer } = require('./mailer');
const { log } = require('../utils/utility-functions');
const JobsModel = require('../src/jobs/jobs.model');

const Executor = async () => {
    let [err, jobs] = await PromiseHandler(JobsModel.find({
        execution_time: { $lte: Date.now() }, 
        execution_status: Constants.EXECUTION_STATUS.PENDING, executed_on: { $eq: null }
    }))
    jobs = jobs.map(async job => {
        let mailOutput = null;
        let mailOptions = {
            to: job.email,
            from: process.env.EMAIL_ID,
            subject: job.subject,
            text: job.body,
        };
        [err, mailOutput] = await PromiseHandler(Mailer(mailOptions));
        if (err) {
            log.error("Error occured while sending mail: ", err);
            job.execution_status = Constants.EXECUTION_STATUS.ERROR;
        }
        log.info("Mail sent: ", mailOutput);
        job.execution_status = Constants.EXECUTION_STATUS.SUCCESS;
        job.executed_on = Date.now();
        return job.save();
    })
    return jobs;
}

module.exports = { Executor };