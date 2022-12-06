/**
 * Images Table
 * 
 * Columns are:
 *   image_id:         int (primary key) (auto increment)
 *   image_type:       string  (url or id)
 *   image_data:       string
 */

const Table = require('./table.js');

class Images extends Table {
    constructor () {
        super(
            'image_id',  // primary key
            'Images',  // table name
            [
                'image_type',
                'image_data'
            ],  // columns, not including primary key
        );
    }
}

module.exports = Images;