/**
 * PlantMarkers_PlantTags Table
 * 
 * Columns are:
 *   plant_marker_plant_tag_id: int (primary key) (auto increment)
 *   plant_marker_id:           int (foreign key in PlantMarkers)
 *   plant_tag_id:              int (foreign key in PlantTags)
 */

const Table = require('./table.js');

class PlantMarkers_PlantTags extends Table {
    constructor () {
        super(
            'plant_marker_plant_tag_id',  // primary key
            'PlantMarkers_PlantTags',  // table name
            [
                'plant_marker_id',
                'plant_tag_id'
            ],  // columns, not including primary key
            [
                { key:'plant_marker_id', table:'PlantMarkers', column:'plant_marker_id' },
                { key:'plant_tag_id', table:'PlantTags', column:'plant_tag_id' }
            ]   // foreign keys (optional)
        );
    }
}

module.exports = PlantMarkers_PlantTags;