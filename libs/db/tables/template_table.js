/**
 * Template for adding new tables
 * 
 * Copy everything after the "//////" line and paste it into a new file in libs\db\tables
 * Replace/remove everythin starting with '_'
 * Look at the other tables for examples (I recommend looking at plant_markers.js)
 * 
 * Dont forget to add the table to libs\db\tables\table_factory.js
 * 
 * Also be careful with the indenting, everything after the comment might be indented by a single space
 */

//////
/**
 * _Things Table
 * 
 * Columns are:
 *   _thing_id:         int (primary key) (auto increment)
 *   _other_thing_id:   int (foreign key in _OtherThings)
 *   _other_data:       string
 */

const Table = require('./table.js');

class _Things extends Table {
    constructor () {
        super(
            '_thing_id',  // primary key
            '_Things',  // table name
            [
                '_other_thing_id',
                '_other_data'
            ],  // columns, not including primary key
            [
                { key:'_other_thing_id', table:'_OtherThings', column:'_other_thing_id' }
            ]   // foreign keys (optional)
        );
    }
}

module.exports = _Things;