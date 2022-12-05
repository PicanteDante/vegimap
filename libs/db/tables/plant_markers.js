/**
 * PlantMarkers Table
 * 
 * Columns are:
 *   plant_marker_id:         int (primary key) (auto increment)
 *   user_id:                 int (foreign key in Users)
 *   marker_post_date:        string (MM/DD/YYYY)
 *   marker_name:             string
 *   marker_description:      string
 *   marker_image:            int (foreign key in Images)
 *   marker_lat:              float
 *   marker_long:             float
 */


const Table = require('./table.js');

class PlantMarkers extends Table {
    constructor () {
        super(
            'plant_marker_id',  // primary key
            'PlantMarkers',  // table name
            [
                'user_id',
                'marker_post_date',
                'marker_name',
                'marker_description',
                'marker_image',
                'marker_lat',
                'marker_long'
            ],  // columns, not including primary key
            [
                { key:'user_id', table:'Users', column:'user_id' },
                { key:'marker_image', table:'Images', column:'image_id' }
            ]   // foreign keys (optional)
        );
    }
}

module.exports = PlantMarkers;
