/**
 * Handles the creation of tables.
 */

const table_names = [
    'images',
    'plant_markers_plant_tags',
    'plant_markers',
    'plant_tags',
    'plant_types',
    'user_marker_ratings',
    'users'
];

const tables = {};

function snake_to_pascal(snake) {
    return snake.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join('');
}

table_names.forEach(table_name => {
    tables[snake_to_pascal(table_name)] = require(`./${table_name}.js`);
});

class TableFactory {
    static tables = table_names.map(snake_to_pascal);
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
            return this.created_tables[table_name];
        }
        if (table_name in tables) {
            return new tables[table_name]();
        } else {
            throw new Error('Table does not exist.');
        }
    }
}

module.exports = TableFactory;