require('dotenv').config()
const Hapi = require('@hapi/hapi');
const Mongoose = require('mongoose');
const { log } = require('./utils/utility-functions')
const MongoConnection = require('./utils/mongodb');
const Routes = require('./src/jobs/jobs.controller');
const Observer = require('./src/observer')
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

(async () => {
    const db = MongoConnection.init();
    const serverConnectionOptions = {
        port: process.env.PORT,
        host: process.env.HOST,
    }
    
    const server = new Hapi.Server(serverConnectionOptions);
    server.route(Routes)
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: 'Email Scheduler API Documentation',
                    version: '1.0',
                },
            }
        }
    ]);
    
    server.start();
    server.events.on('start', () => {
        log.info('Node server is running on ==> ', server.info.uri)
        Observer();
    });
    
    server.events.on('stop', () => log.info('Server has been stopped'));
    server.events.on('response', request => {
        if (request.response) {
            log.info(`${request.method.toUpperCase()} ${request.url.pathname} --> ${request.response.statusCode}`);
        } else {
            log.error('No statusCode : ', `${request.method.toUpperCase()} ${request.url.pathname} --> `);
        }
    });
    
})();
