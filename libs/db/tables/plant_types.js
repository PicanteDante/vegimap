/**
 * PlantTypes Table
 * 
 * Columns are:
 *   plant_type_id:      int (primary key) (auto increment)
 *   plant_type_name:    string
 *   plant_type_desc:    string
 */

const Table = require('./table.js');

class PlantTypes extends Table {
    constructor () {
        super(
            'plant_type_id',  // primary key
            'PlantTypes',  // table name
            [
                'plant_type_name',
                'plant_type_desc'
            ],  // columns, not including primary key
        );
    }
}

module.exports = PlantTypes;