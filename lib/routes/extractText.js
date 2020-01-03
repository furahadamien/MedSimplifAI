'use strict';

const config = require('./config');
const request = require('request');
const path = require('path');
const express = require('express');
let router = express.Router();
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';


let subscriptionKey = config.Key;
let endpoint = config.endPoint;
if (!subscriptionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }

console.log(endpoint);
let uriBase = endpoint + 'vision/v2.1/ocr';

const imageUrl = 'https://metalbyexample.com/wp-content/uploads/figure-65.png';

// Request parameters.
const params = {
    'language': 'unk',
    'detectOrientation': 'true',
};

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

//TODO: create the getText function for the get request endpoint
router.route('/')
    .get(function(req, res){
        getText(req, res);
    });


function getText(req, res){
    
}

//TODO: Insert the obatined text in the database 
request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }else{
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    console.log('JSON Response\n');
    console.log(jsonResponse);

    let JSONObj = JSON.parse(body);

    let Object = JSONObj;
        for(let i = 0; i < Object.regions.length; i++){
            for(let j = 0; j < Object.regions[i].lines.length; j++){
                for(let k = 0; k < Object.regions[i].lines[j].words.length; k++){
                    var str = str + " "+Object.regions[i].lines[j].words[k].text;
                }
                str = str + "\n";
            }
        }

        let arr = str.split("\n");
        for(let i = 0; i < arr.length; i++){
            console.log(arr[i]);
        }

  }

});
module.exports = request;