let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let path = require('path');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt-nodejs');
let mongo=require("mongodb").MongoClient;

let config = require('./config');

let init = async () => {

    try {
        let database = await mongo.connect(config.pool);
        initServer(database);
    } catch (e) {
        console.error('Problem connecting to database');
    }


};

let initServer = (database) => {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(express.static(__dirname+'/public/app'));

    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
        next();
    });

    app.use(morgan('dev'));


    let authRouter = require('./app/routes/authenticate')(app,express,database,jwt,config.secret, bcrypt);
    app.use('/authenticate', authRouter);

    let apiRouter = require('./app/routes/api')(app,express,database, jwt, config.secret, bcrypt);
    app.use('/api', apiRouter);


    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname + '/public/app/index.html'));
    });


    app.listen(config.port);

    console.log('Running on port ' + config.port);
};

init();














