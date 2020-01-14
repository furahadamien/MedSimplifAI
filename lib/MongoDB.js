
const DEFAULT_DATA_FOLDER = 'data';
const DEFAULT_DATA_DB = 'data.db';
const mongo = require('mongodb').MongoClient;
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

      insertOne(doc, callback){
        this.collection.insertOne(doc, callback);
      }

      insertMany(doc, callback){
        this.collection.insertMany(doc, callback);
      }

      find(doc){
        this.collection.find({doc}).toArray((err, items) => {
          console.log(items);
      });
    }

    deleteOne(doc, callback){
      this.collection.deleteOne(doc, callback);
    }

      
}
