const Mongoose = require('mongoose');
const { log } = require('./utility-functions')

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const mongo_connection = process.env.MONGO_URI;
const mongo_dbname = process.env.MONGO_DBNAME;

exports.init = () => {
    let connection_uri = '';
    if (mongo_username != '' && mongo_password != '') {
        connection_uri = `mongodb://${mongo_username}:${mongo_password}@${mongo_connection}/${mongo_dbname}?authSource=admin`;
    } else {
        connection_uri = `mongodb://${mongo_connection}/${mongo_dbname}`;
    }
    console.log(connection_uri)
    Mongoose.connect(connection_uri);

    Mongoose.connection.on('connected', () => {
        log.info(`Mongoose default connection open to mongodb://${mongo_connection}/${mongo_dbname}`);
    });

    Mongoose.connection.on('error', err => {
        log.info(`Mongoose default connection error => ${err}`);
    });


    Mongoose.connection.on('disconnected', () => {
        log.info('Mongoose default connection disconnected');
    });

    process.on('SIGINT', () => {
        Mongoose.connection.close(() => {
            log.info('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}
