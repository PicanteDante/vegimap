

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
db.insert_into('PlantTypes', {
    plant_type_name: 'tomato',
    plant_type_desc: "it's a tomato dude"
});

db.insert_into('PlantMarkers', {
    plant_type_id: db.select_where('PlantTypes', 'plant_type_name', 'tomato')[0].plant_type_id,
    user_id: db.select_where('Users', 'name', 'Daniel')[0].user_id,
    marker_post_date: '4/16/2022',
    marker_name: 'Tomatos near MU',
    marker_desc: 'this is a tomato',
    marker_image: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    marker_lat: 38.9517,
    marker_long: -92.3341
})
.insert_into('PlantMarkers', {
    plant_type_id: db.select_where('PlantTypes', 'plant_type_name', 'tomato')[0].plant_type_id,
    user_id: db.select_where('Users', 'name', 'Daniel')[0].user_id,
    marker_post_date: '4/16/2022',
    marker_name: 'Tomatos near Library',
    marker_desc: 'this is also a tomato',
    marker_image: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    marker_lat: 38.9517,
    marker_long: -92.3331
});

db
.insert_into('PlantTags', {
    plant_tag_name: 'Ripe',
    plant_tag_desc: 'This plant is bearing fruit that is ready to be harvested.'
})
.insert_into('PlantTags', {
    plant_tag_name: 'Unripe',
    plant_tag_desc: 'This plant is bearing fruit that is not yet ready to be harvested.'
})
.insert_into('PlantTags', {
    plant_tag_name: 'Dangerous',
    plant_tag_desc: 'This plant is not safe to eat.'
})
.insert_into('PlantTags', {
    plant_tag_name: 'Harvested',
    plant_tag_desc: 'This plant has been fully harvested for the season.'
});

db.insert_into('PlantMarkers_PlantTags', {
    plant_marker_id: db.select_where('PlantMarkers', 'plant_type_id', db.select_where('PlantTypes', 'plant_type_name', 'tomato')[0].plant_type_id)[0].plant_marker_id,
    plant_tag_id: db.select_where('PlantTags', 'plant_tag_name', 'Ripe')[0].plant_tag_id
});

db.insert_into('PlantMarkers_PlantTags', {
    plant_marker_id: 1,
    plant_tag_id: db.select_where('PlantTags', 'plant_tag_name', 'Harvested')[0].plant_tag_id
});

db.insert_into('UserMarkerRatings', {
    user_id: db.select_where('Users', 'name', 'joseph')[0].user_id,
    plant_marker_id: db.select_where('PlantMarkers', 'plant_type_id', db.select_where('PlantTypes', 'plant_type_name', 'tomato')[0].plant_type_id)[0].plant_marker_id,
    user_marker_rating: 5,
    user_marker_rating_date: '4/17/2022',
    user_marker_rating_desc: 'This is a good tomato!'
});

console.log('The tags of all of Daniel\'s tomato markers');
console.log(
    db.select_where(
        'PlantMarkers',
        'user_id',
        db.select_where('Users', 'name', 'Daniel')[0].user_id
    ).map(
        marker => db.select_where(
            'PlantTags',
            'plant_tag_id',
            db.select_where(
                'PlantMarkers_PlantTags',
                'plant_marker_id',
                marker.plant_marker_id
            )[0].plant_tag_id
        )[0].plant_tag_name
    )
)