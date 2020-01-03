'use strict';

const config = require('./config');
const request = require('request');
const path = require('path');



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

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  console.log('JSON Response\n');
  console.log(jsonResponse);
});
module.exports = request;