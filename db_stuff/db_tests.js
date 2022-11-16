var db = require('./db_stuff.js');


test_db = db.create_db();

console.log(test_db);

test_db['Users']

var query = new db.Query(test_db);