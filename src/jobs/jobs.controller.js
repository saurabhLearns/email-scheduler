const Service = require('./jobs.service');
const Validations = require('./jobs.validations');

module.exports = [
    {
        method: 'POST', 
        path: '/v1/jobs',
        options: {
            description: 'Schedule the jobs',
            tags: ['api'],
            validate: Validations.create_jobs,
            handler: async (request, h) => Service.CreateJobs(request, h)
        },
    },
    {
        method: 'GET', 
        path: '/v1/jobs',
        options: {
            description: 'Get all scheduled jobs',
            tags: ['api'],
            validate: Validations.get_jobs,
            handler: async (request, h) => Service.GetJobs(request, h)
        }
    },
    {
        method: 'GET', 
        path: '/v1/jobs/{id}',
        options: {
            description: 'Get details of single job',
            tags: ['api'],
            validate: Validations.get_job,
            handler: async (request, h) => Service.GetJob(request, h)    
        }
    }
]
