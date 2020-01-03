const http = require('http');
const express = require('express');
const path  = require('path');
const cors = require('cors');
//const api = require('./routes/api');
const bodyParser = require('body-parser');

const HTTP_PORT = 3000;
const DEFAULT_USE_CORS = true;
console.log(' checked');

class API{
    
    constructor(options){
        let self = this;
        options = options || {};
        self.specifiedHttpPort = options.httpPort || HTTP_PORT;
        self.httpPort = process.env.PORT || self.specifiedHttpPort;
        self.useCors = options.useCors || DEFAULT_USE_CORS;

        //TO-DO, add request manager
        //self.database = new databaseManager(options);
        //self.requests = new requestManager(options, self.database);
        

        if(options.app){
            self.app = options.app;
        }
        else{
            self.app = express();
            self.server = http.createServer(self.app);

            if(self.useCors){
                self.app.use(cors());
            }

            self.server.listen(self.httpPort, function(){
                console.log('app running on  port ', self.httpPort);
            });
           
        }
        self.router = express.Router();
        self.app.use(bodyParser.json());

        self.app.use(function(req, res, next) {
            req.jsonsilo = self;
            next();
        });


        self.app.use('/extractText', require('./routes/extractText'));
        


    }

}
module.exports = API;
