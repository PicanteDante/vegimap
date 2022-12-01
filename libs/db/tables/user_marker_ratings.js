/**
 * User Marker ratings Table
 * 
 * (Kind of an intersection table between Users and PlantMarkers)
 * 
 * Columns are:
 *   user_marker_rating_id:         int (primary key) (auto increment)
 *   user_id:                       int (foreign key in Users)
 *   plant_marker_id:               int (foreign key in PlantMarkers)
 *   user_marker_rating:            int
 *   user_marker_rating_date:       string (MM/DD/YYYY)
 *   user_marker_rating_comment:    string
 */

const Table = require('./table.js');

class UserMarkerRatings extends Table {
    constructor () {
        super(
            'user_marker_rating_id',  // primary key
            'UserMarkerRatings',  // table name
            [
                'user_id',
                'plant_marker_id',
                'user_marker_rating',
                'user_marker_rating_date',
                'user_marker_rating_comment'
            ],  // columns
            [
                { key:'user_id', table:'Users', column:'user_id' },
                { key:'plant_marker_id', table:'PlantMarkers', column:'plant_marker_id' }
            ]  // foreign keys
        );
    }
}

module.exports = UserMarkerRatings;
