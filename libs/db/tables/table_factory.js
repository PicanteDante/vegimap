/**
 * Handles the creation of tables.
 */

const _ = require('lodash');

const tables = {
    'Images': require('./images.js'),
    'PlantMarkers_PlantTags': require('./plant_markers_plant_tags.js'),
    'PlantMarkers': require('./plant_markers.js'),
    'PlantTags': require('./plant_tags.js'),
    'PlantTypes': require('./plant_types.js'),
    'UserMarkerRatings': require('./user_marker_ratings.js'),
    'Users': require('./users.js')
};

class TableFactory {
    static tables = _.keys(tables);
    static created_tables = {};
    /**
     * Create a table. If the table has already been created, return the existing table.
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
        if (table_name in this.created_tables) {
        }
        if (table_name in tables) {
            this.created_tables[table_name] = new tables[table_name]();
            return this.created_tables[table_name];
        } else {
            throw new Error('Table does not exist.');
        }
    }
}

module.exports = TableFactory;