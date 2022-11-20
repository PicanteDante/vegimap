

const Database = require('./db.js');

const db = new Database();

db.insert_into('Users', {
    username: 'hugh-mungus-445',
    name: 'billy',
    plant_points: 0,
    date_joined: '01/01/2020',
    email: 'zamn@daniel.org'
})
.insert_into('Users', {
    username: 'TheLegend27',
    name: 'daniel',
    plant_points: 16,
    date_joined: '01/01/2020',
    email: 'garfield@gmail.com'
})
.insert_into('Users', {
    username: 'Broseph',
    name: 'joseph',
    plant_points: 5,
    date_joined: '01/01/2020',
    email: 'idk@gmail.com'
});

console.log("where user pp > 0");
console.log(db.select_where_predicate('Users', user => user.plant_points > 0));

console.log("where user's name is daniel");
console.log(db.select_where('Users', 'name', 'daniel'));

console.log("user with id 1");
console.log(db.select_by_id('Users', 1));

console.log("all users");
console.log(db.all('Users'));

console.log("users where pp === 0 (mod 2)");
console.log(db.select_where_predicate('Users', user => (user.plant_points % 2) === 0));

console.log("changing user 1's name to 'Daniel'");
db.edit_by_id('Users', 1, { name: 'Daniel' });
console.log("user 1");
console.log(db.select_by_id('Users', 1));

console.log("setting all people named joseph's pp to 1");
db.edit_where('Users', 'name', 'joseph', { plant_points: 1 });
console.log("joseph");
console.log(db.select_where('Users', 'name', 'joseph'));

console.log("incrementing all users' pp by 1");
db.edit_where_predicate_callback('Users', user => true, user => ({ plant_points: user.plant_points + 1 }));
console.log("all users");
console.log(db.all('Users'));

console.log("delete user 0");
db.delete_by_id('Users', 0);
console.log("all users");
console.log(db.all('Users'));

db.insert_into('Users', {
    username: 'troll123',
    name: 'troll',
    plant_points: -100,
    date_joined: '11/30/2022',
    email: 'aijfoi@hotmail.com'
});

db.insert_into('Users', {
    username: 'troll234',
    name: 'troll',
    plant_points: -100,
    date_joined: '11/30/2022',
    email: 'adskghokto@hotmail.com'
});

console.log("all users");
console.log(db.all('Users'));

console.log("deleting where username is troll123");
db.delete_where('Users', 'username', 'troll123');
console.log("all users");
console.log(db.all('Users'));

console.log("deleting where pp is less than 0");
db.delete_where_predicate('Users', user => user.plant_points < 0);
console.log("all users");
console.log(db.all('Users'));

// these all work. I am such a good programmer haha...