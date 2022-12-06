/**
 * PlantTags Table
 * 
 * Columns are:
 *   plant_tag_id:           int (primary key) (auto increment)
 *   plant_tag_name:         string
 *   plant_tag_description:  string
 */


const Table = require('./table.js');

class PlantTags extends Table {
    constructor () {
        super(
            'plant_tag_id',  // primary key
            'PlantTags',  // table name
            [
                'plant_tag_name',
                'plant_tag_description'
            ],  // columns, not including primary key   
        );
    }
}

module.exports = PlantTags;