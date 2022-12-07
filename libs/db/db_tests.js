

const Database = require('./db.js');

const pre_save_db = new Database();

let s = pre_save_db.to_json();

console.log(s);

const fs = require('fs');
