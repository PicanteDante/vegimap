
db.json -> the whole database
db_info.js -> constants such as schemas, table names, etc.
db.js -> the database interface
    - Contains classes for the various tables
    - Contains classes for the rows in each table
    - Allows saving and loading directly to db.json
    - Allows all CRUD operations (Create, Read, Update, Delete)
    - Well documented (I think)
    - Clean code (not really)
db_tests.js -> "Unit tests" for the database
db_init.js -> Initialize the database (run this by itself)