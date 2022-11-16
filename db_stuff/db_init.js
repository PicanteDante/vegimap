
const fs = require('fs');
const _ = require('lodash');

var db_info = require('./db_info.js');

const db_folder = './db_stuff/tables';

function create_table(table_name) {
	schema = schemas[table_name];
	let table = {
		'table_name': table_name,
		'primary_key': _.findKey(schema, (value, key) => value.primary),
		'columns': [],
		'data': [],
		'schema': schema
	};
	_.forEach(schema, (value, key) => {
		table.columns.push(key);
	});
	return table;
}

function create_db() {
	let db = {};
	_.forEach(schemas, (value, key) => {
		db[key] = create_table(key);
	});
	return db;
}

/**
 * Update the database to reflect changes made to the schemas
 */
function update_db() {
	// get the current db
	let db = JSON.parse(fs.readFileSync(db_file));

	// loop over the tables
	_.forEach(db, (table, table_name) => {
		// loop over the columns
		_.forEach(table.schema, (column, column_name) => {
			// if the column is not in the schema, delete it
			if (!schemas[table_name][column_name]) {
				_.forEach(table.data, (row) => {
					delete row[column_name];
				});
				delete table.schema[column_name];
			}
		});
		// loop over the schema
		_.forEach(schemas[table_name], (column, column_name) => {
			// if the column is not in the table, add it
			if (!table.schema[column_name]) {
				_.forEach(table.data, (row) => {
					row[column_name] = null;
				});
				table.schema[column_name] = column;
			}
		});
	});
}

module.exports = {
	'create_table': create_table,
	'create_db': create_db,
	'table_names': table_names,
	'schemas': schemas
}