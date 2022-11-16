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
 *  - Update: no...
 *  - Delete: no...
 * 
 *  What next?
 *    - Update and delete methods
 *    - more read methods
 *         - get user by column
 *         - filter users
 *         - get related info (e.g. get user's plants)
 *    - enforce datatypes
 *    - enforce foreign key constraints
 *    - enforce unique constraints
 *    - enforce not null constraints
 *    - implement basic SQL like queries (SELECT ... FROM ... INNER JOIN ... ON ... WHERE ... GROUP BY ... ORDER BY ...)
 */

const _ = require('lodash');
const assert = require('assert');

const TableFactory = require('./table_factory.js');

class Table {
    constructor (primary_key, table_name, columns, foreign_keys=[]) {
        this.auto_id = 0;
        this.primary_key = primary_key;  // Primary key of the table
        this.foreign_keys = foreign_keys;  // Foreign keys of the table
        this.keys = [];  // Primary key column
        this.table_name = table_name;  // Name of the table
        this.columns = columns;  // Columns of the table
        this.data = {};  // mapping of primary key to row
    }

    /**
     * Create a row in the table
     * 
     * @param {Object} entries - key value pairs of the row (does not include primary key) (missing columns will be filled with null)
     * 
     * @returns {Object} - self (for chaining)
     */
    create_row (entries) {
        let row = {};
        row[this.primary_key] = this.auto_id;
        this.auto_id++;
        this.columns.forEach(column => {
            if (column in entries) {
                row[column] = entries[column];
            } else {
                row[column] = null;
            }
        });
        this.keys.push(row[this.primary_key]);
        this.data[row[this.primary_key]] = row;
        return this;
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
        return table;
    }
}

module.exports = Table;