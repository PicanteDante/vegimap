/**
 * Table Base Class
 * 
 * Provides functionality for all tables.
 * 
 * What do?
 *  - Represents the users table in the database
 *  - methods for interacting with the user object
 * 
 * CRUD operations?
 *  - Create: yes
 *      - can create a user  
 *  - Read: yes
 *      - can get a user by id
 *  - Update: yes
 *  - Delete: yes
 * 
 *  What next?
 *    - enforce datatypes
 *    - helper methods
 *       - get id
 *       - proper foreign key indexing  
 */

const _ = require('lodash');
const assert = require('assert');

const TableFactory = require('./table_factory.js');

/**
* Represents a table
*/
class Table {
    static db = null;
    
    /**
     * @param {String} primary_key - name of the primary key column
     * @param {String} table_name - name of the table
     * @param {Array} columns - array of column names
     * @param {Array} foreign_keys - array of foreign keys (default []) 
     */
    constructor (primary_key, table_name, columns, foreign_keys=[]) {
        this.auto_id = 0;
        this.primary_key = primary_key;  // Primary key of the table
        this.foreign_keys = foreign_keys;  // Foreign keys of the table
        this.keys = [];  // Primary key column
        this.table_name = table_name;  // Name of the table
        this.columns = columns;  // Columns of the table
        this.data = {};  // mapping of primary key to row
        // this.indexes = {};  // mapping of foreign key to array of primary keys

        // Create indexes for foreign keys
        // assume no data yet
        // this.foreign_keys.forEach(foreign_key => {
        //     this.indexes[foreign_key] = {};
        // });
    }

    
    /**
     * Create a row in the table
     * @param {Object} entries - key value pairs of the row (does not include primary key) (missing columns will be filled with null)
     * 
     * @returns {int} - primary key of the new row
     */
    create_row (entry) {
        let row = {};
        let key = this.auto_id;
        this.auto_id++;
        row[this.primary_key] = key;
        this.columns.forEach(column => {
            if (column in entry) {
                row[column] = entry[column];
            } else {
                row[column] = null;
            }
        });
        // this.foreign_keys.forEach(foreign_key => {
        //     if (row[foreign_key] !== null) {
        //         if (!(row[foreign_key] in this.indexes[foreign_key])) {
        //             this.indexes[foreign_key][row[foreign_key]] = [];
        //         }
        //         this.indexes[foreign_key][row[foreign_key]].push(row[this.primary_key]);
        //     }
        // });
        this.keys.push(row[this.primary_key]);
        this.data[row[this.primary_key]] = row;
        return key;
    }

    /**
     * Get a row by primary key
     * 
     * @param {Number} key - primary key of the row
     * 
     * @returns {Object} - row
     */
    get_row (key) {
        return this.data[key];
    }

    /**
     * Select rows from a table where the column matches the value
     * 
     * @param {String} column - column to match
     * @param {String} value - value to match
     * 
     * @returns {Array} - array of rows
     */
    select_where (column, value) {
        let rows = [];
        console.log("select_where", column, value);
        // if (column in this.indexes) {
        //     if (value in this.indexes[column]) {
        //         this.indexes[column][value].forEach(key => {
        //             rows.push(this.data[key]);
        //         });
        //     }
        // } else {
        this.keys.forEach(key => {
            if (this.data[key][column] === value) {
                rows.push(this.data[key]);
            }
        });
        // }
        return rows;
    }

    /**
     * Get rows in the table that match a given predicate
     * 
     * @param {Function} predicate - function that takes a row and returns true if the row should be included
     * 
     * @returns {Array} - array of rows that match the predicate
     * 
     * @example  // get all users who have more than 5 plants
     *          let users = table.select_where_predicate(user => {
     *              return db.tables.plant_markers.select_where('user_id', user.id).length > 5;
     *          });
     * 
     * @example  // get all users whose plants have an average rating below 1
     *          let users = table.select_where_predicate(user => {
     *              let plant_markers = db.tables.plant_markers.select_where('user_id', user.id);
     *              let ratings = plant_markers.filter(marker => marker.marker_rating !== null).map(plant => plant.rating);
     *              let avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
     *              return avg < 1;
     *         });
     */
    select_where_predicate (predicate) {
        let rows = [];
        this.keys.forEach(key => {
            if (predicate(this.data[key])) {
                rows.push(this.data[key]);
            }
        });
        return rows;
    }

    /**
     * Get all rows in the table as an array
     * 
     * @returns {Array} - array of rows
     */
    get_all () {
        let rows = [];
        this.keys.forEach(key => {
            rows.push(this.data[key]);
        });
        return rows;
    }

    /**
     * Edit a row in the table
     * 
     * @param {Number} id - primary key of the row
     * @param {Object} data - key value pairs to update
     * 
     * @returns {Object} - self (for chaining)
     * 
     * @example  // increment the pp of a user by 3
     *          let old_pp = db.tables.users.get_row(1).plant_points;
     *          db.tables.users.edit_row(1, {plant_points: old_pp + 3});
     */
    edit_row(id, data) {
        let row = this.data[id];
        _.keys(data).forEach(key => {
            row[key] = data[key];
        });
        return row;
    }

    /**
     * Edit all rows in the table where the column matches the value
     * 
     * @param {String} column - column to match
     * @param {String} value - value to match
     * @param {Object} data - key value pairs to update
     * 
     * @returns {Object} - self (for chaining)
     * 
     * @example  // set the pp of user's named 'Jimothy' to -1
     *         db.tables.users.edit_where('name', 'Jimothy', {plant_points: -1});
     */
    edit_where(column, value, data) {
        this.select_where(column, value).forEach(row => {
            this.edit_row(row[this.primary_key], data);
        });
        return this;
    }

    /**
     * Edit all rows in the table where the predicate is true
     * (honestly not that useful)
     * 
     * @param {Function} predicate - function that takes a row and returns true if the row should be updated
     * @param {Object} data - key value pairs to update
     * 
     * @returns {Object} - self (for chaining)
     * 
     * @example  // set the pp of all users with no plants to 0
     *          db.tables.users.edit_where_predicate(user => {
     *             return db.tables.plant_markers.select_where('user_id', user.id).length === 0;
     *         }, {plant_points: 0});
     */
    edit_where_predicate(predicate, data) {
        this.select_where_predicate(predicate).forEach(row => {
            this.edit_row(row[this.primary_key], data);
        });
        return this;
    }

    /**
     * Edit all rows in the table where the predicate is true
     * Uses a callback with a single parameter (the row data) to get the new data
     * 
     * @param {Function} predicate - function that takes a row and returns true if the row should be updated
     * @param {Function} callback - function that takes a row and returns the new data
     * 
     * @returns {Object} - self (for chaining)
     * 
     * @example  // increment the pp of all users with more than 5 plants by 3
     *          db.tables.users.edit_where_predicate(
     *              user => {db.tables.plant_markers.select_where('user_id', user.id).length > 5},
     *              user => {plant_points: user.plant_points + 3}
     *         );
     */
    edit_where_predicate_callback(predicate, callback) {
        this.select_where_predicate(predicate).forEach(row => {
            this.edit_row(row[this.primary_key], callback(row));
        });
        return this;
    }

    /**
     * Delete a row from this table only (does not delete from other tables)
     * (warning, never use this directly, use delete_row instead)
     * 
     * @param {Number} id - primary key of the row
     */
    delete_row_isolated(id) {
        // first remove the row from data
        delete this.data[id];
        // then remove the id from the keys array
        this.keys.splice(this.keys.indexOf(id), 1);
        // then remove from indexing
        // Object.keys(this.foreign_keys).forEach(fk => {
        //     let column = fk.key;
        //     let index = this.indexes[column];
        //     let value = this.data[id][column];
        //     index[value].splice(index[value].indexOf(id), 1);
        // });
    }

    /**
     * Delete a row from the table
     * 
     * @param {Number} id - primary key of the row
     * 
     * @returns {Object} - self (for chaining)
     * 
     * @example  // delete a user with id 2
     *           db.tables.users.delete_row(2);
     */
    delete_row(id) {
        // first delete the row from this table
        this.delete_row_isolated(id);
        // remove the key from other tables
        Object.keys(Table.db.tables).forEach(table_name => {
            let table = Table.db.tables[table_name];
            if (table !== this) {
                let rows_to_delete = table.select_where(this.primary_key, id);
                rows_to_delete.forEach(row => {
                    table.delete_row_isolated(row[table.primary_key]);
                });
            }
        });
        return this;
    }

    /**
     * Delete all rows in the table where the column matches the value
     * 
     * @param {String} column - column to match
     * @param {String} value - value to match
     * 
     * @returns {Object} - self (for chaining)
     * 
     * @example  // delete all users named 'Jimothy'
     *          db.tables.users.delete_where('name', 'Jimothy');
     */
    delete_where(column, value) {
        this.select_where(column, value).forEach(row => {
            this.delete_row(row[this.primary_key]);
        });
        return this;
    }

    /**
     * Delete all rows in the table where the predicate is true
     * 
     * @param {Function} predicate - function that takes a row and returns true if the row should be deleted
     * 
     * @returns {Object} - self (for chaining)
     * 
     * @example  // delete all users with no plants
     *          db.tables.users.delete_where_predicate(user => {
     *              return db.tables.plant_markers.select_where('user_id', user.id).length === 0;
     *          });
     */
    delete_where_predicate(predicate) {
        this.select_where_predicate(predicate).forEach(row => {
            this.delete_row(row[this.primary_key]);
        });
        return this;
    }

    /**
     * Convert the table to json
     * 
     * @returns {Object} - json representation of the table
     */
    to_json () {
        let ret = {
            'auto_id': this.auto_id,
            'primary_key': this.primary_key,
            'foreign_keys': this.foreign_keys,
            'keys': this.keys,
            'table_name': this.table_name,
            'columns': this.columns,
            'data': this.data,
            'indexes': this.indexes
        }
        return ret;
    }

    static from_json (json) {
        let table = TableFactory.create_table(json.table_name);
        table.auto_id = json.auto_id;
        table.primary_key = json.primary_key;
        table.foreign_keys = json.foreign_keys;
        table.keys = json.keys;
        table.table_name = json.table_name;
        table.columns = json.columns;
        table.data = json.data;
        table.indexes = json.indexes;
        return table;
    }
}

module.exports = Table;