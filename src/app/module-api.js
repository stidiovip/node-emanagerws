const express = require ('express');
const server = express();

const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

const ModuleService = require('./module-service');
const mService = new ModuleService();

server.use(morgan('dev'));                                         // log every request to the console
server.use(bodyParser.json());                                     // parse application/json
server.use(methodOverride());

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.get('/contacts', function(req, res) {
    let contacts = mService.getContacts();
    res.json(contacts);
});

server.get('/contacts/:id', function(req, res) {
    let contact = mService.findContactById(req.params.id);
    res.json(contact);
});

server.listen(9484);
console.log("Access to the app at : http://localhost:9484/");