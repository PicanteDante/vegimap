/**
 * Handles all the tables
 */

const table_factory = require('./tables/table_factory.js');

const table = require('./tables/table.js');

class Database {
    static instance = null;

    constructor () {
        table.db = this;
        this.tables = {};
        table_factory.tables.forEach(table_name => {
            console.log(`Loading table ${table_name}`);
            this.tables[table_name] = table_factory.create_table(table_name);
        });
    }

    prepopulate() {
        // prepoulates with test data
        // TESTING
        // TODO: REMOVE
        const crypto = require('crypto');
        this.create_user(
            'Shrek',
            crypto.createHash('sha256').update('test').digest('hex'),
            'shrek@test.com',
        );
        this.create_user(
            'Raffaele',
            crypto.createHash('sha256').update('test2').digest('hex'),
            'deamici@test.com',
            'image01.png'
        );
        this.create_user(
            'Drake',
            crypto.createHash('sha256').update('test3').digest('hex'),
            'DrakeTheTypeOfDudeToHaveAReallyLongEmailAddress@test.com',
            'image10.jpg'
        );

        this.insert_into('PlantMarkers', {
            user_id: 0,
            marker_post_date: '01/01/2020',
            marker_name: 'potato :)',
            marker_description: 'this is a potato',
            marker_image: 1,
            marker_lat: 44.5672487,
            marker_long: -123.2892548
        })

        this.insert_into('PlantMarkers', {
            user_id: 0,
            marker_post_date: '01/01/2020',
            marker_name: 'tomato :(',
            marker_description: 'this is a tomato',
            marker_image: 1,
            marker_lat: 44.5677487,
            marker_long: -123.2896548
        })
    }

//#region table stuff
    /** 
    * Gets the instance of the database. If the database has not been created yet, it will create it.
    * @return {Database} The instance of the database
    */
    static get_instance() {
        if (Database.instance === null) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    insert_into(table_name, data) {
        return this.tables[table_name].create_row(data);
    }

    select_by_id(table_name, id) {
        return this.tables[table_name].get_row(id);
    }

    select_where(table_name, column, value) {
        return this.tables[table_name].select_where(column, value);
    }

    select_where_predicate(table_name, predicate) {
        return this.tables[table_name].select_where_predicate(predicate);
    }

    edit_by_id(table_name, id, data) {
        this.tables[table_name].edit_row(id, data);
        return this;
    }

    edit_where(table_name, column, value, data) {
        this.tables[table_name].edit_where(column, value, data);
        return this;
    }

    edit_where_predicate(table_name, predicate, data) {
        this.tables[table_name].edit_where_predicate(predicate, data);
        return this;
    }

    edit_where_predicate_callback(table_name, predicate, callback) {
        this.tables[table_name].edit_where_predicate_callback(predicate, callback);
        return this;
    }

    delete_by_id(table_name, id) {
        this.tables[table_name].delete_row(id);
        return this;
    }

    delete_where(table_name, column, value) {
        this.tables[table_name].delete_where(column, value);
        return this;
    }

    delete_where_predicate(table_name, predicate) {
        this.tables[table_name].delete_where_predicate(predicate);
        return this;
    }

    all(table_name) {
        return this.tables[table_name].get_all();
    }
    //#endregion

    create_user(username, password_hash, email, pfp='/default_pfp.png') {
        // creates a user and returns the user id
        let image_id = this.insert_into('Images', {
            image_type: 'url',
            image_data: pfp
        });
        return this.insert_into('Users', {
            username: username,
            password: password_hash,
            email: email,
            plant_points: 0,
            date_joined: new Date().toLocaleDateString(),
            image_id: image_id
        });
    }

    to_json() {
        let json = {};
        for (let table_name in this.tables) {
            json[table_name] = this.tables[table_name].to_json();
        }
        return json;
    }

    static from_json(json) {
        let db = new Database();
        for (let table_name in json) {
            db.tables[table_name] = table.from_json(table_name, json[table_name]);
        }
        return db;
    }
}

module.exports = Database;