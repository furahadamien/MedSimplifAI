const MongoDB = require('./MongoDB');

class DatabaseManager {

    constructor(options) {
        options = options || {};
    
        // TODO: in future support other databases
        this.database = new MongoDB(options);
      }
    

}

module.exports = DatabaseManager;