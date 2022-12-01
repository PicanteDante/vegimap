/**
 * Users Table
 * 
 * Columns are as follows (the SQL way lol):
 *  user_id:        int (primary key) (auto increment)
 *  name:           string
 *  plant_points:   int
 *  date_joined:    string (MM/DD/YYYY)
 *  email:          string
 *  password:       string
 */

const Table = require('./table.js');

class Users extends Table {
    constructor () {
        super(
            'user_id',  // primary key
            'Users',  // table name
            ['name', 'plant_points', 'date_joined', 'email', 'password']  // columns
        );
    }
}

module.exports = Users;
