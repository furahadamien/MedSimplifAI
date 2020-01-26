var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
const config = require('./config');
const request = require('request');
const uploadImage = require('./uploadImage');
const AzureCognitive = require('./azureCognitive');

var url = 'mongodb://localhost:27017/test';

var tempstr = '';
//TODO: connect to MongoDB here

let subscriptionKey = config.Key;
let endpoint = config.endPoint;
if (!subscriptionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }

console.log(endpoint);
let uriBase = endpoint + 'vision/v2.1/ocr';

//const imageUrl = 'https://metalbyexample.com/wp-content/uploads/figure-65.png';
const imageUrl ='https://image.slidesharecdn.com/leonardodavinci-140406121225-phpapp01/95/the-multiple-intelligences-of-leonardo-da-vinci-according-to-the-theory-of-howard-gardner-2-638.jpg';

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

//TODO: Insert the obatined text in the database 
request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }else{
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    //console.log('JSON Response\n');
    //console.log(jsonResponse);

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
            //console.log(arr[i]);
        }


  }
  tempstr = str;
  console.log(str);

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

/**
 * IMAGE upload
 *  request from the client side
 * 
 */
router.post('/imageupload', function(req, res, next){
  uploadImage.create(req, res, function(status, data) {
    //let response = responseHandler.prepareResponse(req, status, data);
    res.status(status).json(req);
  });
})

router.post('/insert', function(req, res, next) {
  var item = {
    title: tempstr,
    content: tempstr,
    author: tempstr
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
});

module.exports = router;
