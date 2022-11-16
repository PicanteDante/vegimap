/**
 * Author: M
 * 
 * database related classes and functions
 */

const db_info = require('./db_stuff/db_info.js');
const fs = require('fs');
const _ = require('lodash');

let db_file = './db_stuff/db.json';

/**
 * @name parse_datatype
 * @description Parses a datatype string into the corresponding datatype
 * @param {string} data - the data
 * @param {string} datatype - the datatype
 * 
 * @returns {any} - the parsed data
 */
function parse_datatype(data, datatype) {
    switch (datatype) {
        case 'int':
            return parseInt(data);
        case 'float':
            return parseFloat(data);
        case 'bool':
            return data === 'true';
        case 'date':
            return new Date(data);
        case 'image':
            // stored as name of file in images folder
            return StoredImage(data);
        default:
            return data;
    }
}

class StoredImage {
    constructor(data) {
        this.data = data;
    }

    as_image_tag() {
        
    }
}
/**
 * Literally the entire database
 */
class Database {
    constructor() {
        this.table_dict = {};
        this.table_list = {};
        this.table_names = db_info.table_names;
        this.schemas = db_info.schemas;
        this.db_file = db_file;
        this.load_db();
    }

    load_db() {
        let data = JSON.parse(fs.readFileSync(this.db_file));
        
    }
}