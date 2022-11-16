/**
 * Users Table
 * 
 * Columns are as follows (the SQL way lol):
 *  user_id:        int (primary key) (auto increment)
 *  username:       string
 *  name:           string
 *  plant_points:   int
 *  date_joined:    string (MM/DD/YYYY)
 *  email:          string
 */

const Table = require('./table.js');

class Users extends Table {
    constructor () {
        super(
            'user_id',  // primary key
            'Users',  // table name
            ['username', 'name', 'plant_points', 'date_joined', 'email']  // columns
        );
    }
}

module.exports = Users;