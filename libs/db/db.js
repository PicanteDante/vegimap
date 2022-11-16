/**
 * Handles all the tables
 */

const table_factory = require('./tables/table_factory.js');
const table = require('./tables/table.js');

class Database {
    constructor () {
        this.tables = {};
        table_factory.tables.forEach(table_name => {
            this.tables[table_name] = table_factory.create_table(table_name);
        });
    }

    insert_into(table_name, data) {
        this.tables[table_name].create_row(data);
    }

    select_from(table_name, key) {
        return this.tables[table_name].get_row(key);
    }
}

module.exports = Database;