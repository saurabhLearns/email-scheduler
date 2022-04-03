const { log, PromiseHandler, DateParser } = require('../../utils/utility-functions')
const { Response } = require('../../utils/ResponseFormat');
const JobsModel = require('./jobs.model');

/**
 * Service function to create jobs
 * @param {*} request 
 * @param {*} h 
 * @returns 
 */
const CreateJobs = async (request, h) => {
    let promises = request.payload.map(async input => {
        input.execution_time = input.time;
        return JobsModel.create(input);
    })
    
    let [err, result] = await PromiseHandler(Promise.all(promises));
    if (err) {
        log.error("Error while adding jobs => ", err);
        return h.response(Response('Internal Server Error', null, 500)).code(500);
    }
    
    return h.response(Response('Created Successfully', result, 201)).code(201)
};

/**
 * Service function to get details of multiple jobs
 * @param {*} request 
 * @param {*} h 
 * @returns 
 */
const GetJobs = async (request, h) => {

    let [err, [count, jobs]] = await PromiseHandler(Promise.all([
        JobsModel.countDocuments({}),
        JobsModel.find({})
        .skip((((request.query.page ? request.query.page : 1) - 1) * (request.query.limit ? request.query.limit : 15)))
        .limit(request.query.limit ? request.query.limit : 15)
    ]));
    if (err) {
        log.error("Error while getting jobs => ", err);
        return h.response(Response('Internal Server Error', null, 500)).code(500);
    }
    return h.response(Response('Success', { count, jobs }, 200)).code(200);
};

/**
 * Service function to get details of single job
 * @param {*} request 
 * @param {*} h 
 * @returns
 */
const GetJob = async (request, h) => {
    let [err, job] = await PromiseHandler(JobsModel.findById(request.params.id));
    if (err) {
        log.error("Error while getting a job => ", err);
        return h.response(Response('Internal Server Error', null, 500)).code(500)
    }
    
    return h.response(Response('Success', job, 200)).code(200)
}

module.exports = {
    CreateJobs,
    GetJobs,
    GetJob
}