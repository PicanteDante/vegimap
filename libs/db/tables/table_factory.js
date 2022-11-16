/**
 * Handles the creation of tables.
 */

const PlantMarkers_PlantTags = require('./plant_markers_plant_tags.js');
const PlantMarkers = require('./plant_markers.js');
const PlantTags = require('./plant_tags.js');
const PlantTypes = require('./plant_types.js');
// table_factory.js
// table.js
// template_table.js
const UserMarkerRatings = require('./user_marker_ratings.js');
const Users = require('./users.js');

class TableFactory {
    static tables = [
        'PlantMarkers_PlantTags',
        'PlantMarkers',
        'PlantTags',
        'PlantTypes',
        'UserMarkerRatings',
        'Users'
    ]
    /**
     * Create a table
     * 
     * @param {String} table_name - name of the table
     * 
     * @returns {Object} - the table object
     * 
     * @throws {Error} - if table does not exist
     * @throws {Error} - if table name is not a string
     * @throws {Error} - if table name is empty
     * 
     */
    static create_table (table_name) {
        if (typeof table_name !== 'string') {
            throw new Error('Table name must be a string.');
        }
        if (table_name.length === 0) {
            throw new Error('Table name cannot be empty.');
        }
        switch (table_name) {
            case 'PlantMarkers_PlantTags':  return new PlantMarkers_PlantTags();
            case 'PlantMarkers':            return new PlantMarkers();
            case 'PlantTags':               return new PlantTags();
            case 'PlantTypes':              return new PlantTypes();
            case 'UserMarkerRatings':       return new UserMarkerRatings();
            case 'Users':                   return new Users();
            default:
                throw new Error('Table does not exist.');
        }
    }
}

module.exports = TableFactory;