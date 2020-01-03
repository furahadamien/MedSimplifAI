const MongoDB = require('./MongoDB');

class DatabaseManager {

    constructor(options) {
        options = options || {};
    
        // TODO: in future support other databases
        this.database = new MongoDB(options);
    }
    
    inserOne(text, callBack){
          //this.database.inserOne()
    }

    inserMany(text, callBack){
        //this.database.inserOne()
    }
    find(text, callBack){
        //this.database.inserOne()
    }
    findOne(text, callBack){
        //this.database.inserOne()
    }
    updateOne(text, callBack){
        //this.database.inserOne()
    }

    deleteOne(text, callBack){
        //this.database.inserOne()
    }

}

module.exports = DatabaseManager;