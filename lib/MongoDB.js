const mongo = require('mongodb').MongoClient;
const DEFAULT_DATA_FOLDER = 'data';
const DEFAULT_DATA_DB = 'data.db';
const url = 'mongodb://localhost:27017';

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  //...
})

class MongoDB {


    constructor(options) {
        options = options || {};

        this.db = client.db('kennel');
        this.collection = db.collection('texts');

      }
      
}
