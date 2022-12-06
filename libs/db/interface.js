
// get hashing algorithm
const crypto = require('crypto');

class Interface {
    static interfaces = [];
    constructor (db) {
        this.db = db;
        Interface.interfaces.push(this);
    }
}

/**
 * Methods for signing up and logging in
 */
class Signup extends Interface {
    /**
     * Creates a new user on sign up
     * 
     * @param {{ body: { username: string, password: string, email: string}}} req - request object
     * @returns {{ success: boolean, message: string, user_id: int}} - {success: Bool, message: String, user_id: Int}
     */
    register(req) {
        // first check if username is between 3-20 characters
        if (req.body.username.length < 3 || req.body.username.length > 20) {
            return {
                success: false,
                message: "Username must be between 3-20 characters"
            };
        }
        // check if username is alphanumeric including underscores
        if (!/^[a-zA-Z0-9_]+$/.test(req.body.username)) {
            return {
                success: false,
                message: "Username must be alphanumeric"
            };
        }
        // check if email is valid
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
            return {
                success: false,
                message: "Email is invalid"
            };
        }
        // check if password is between 8-20 characters
        if (req.body.password.length < 8 || req.body.password.length > 20) {
            return {
                success: false,
                message: "Password must be between 8-20 characters"
            };
        }
        // check if email or username is already in use
        var check = this.check_register(req);
        if (check.email_in_use) {
            return {
                success: false,
                message: "Email is already in use"
            };
        } else if (check.username_in_use) {
            return {
                success: false,
                message: "Username is already in use"
            };
        }
        
        // hash password
        var password_hash = crypto.createHash('sha256').update(req.body.password).digest('hex');

        // insert into database
        let user_id = this.db.create_user(
            req.body.username,
            password_hash,
            req.body.email
        );
        return {
            success: true,
            message: "success",
            user_id: user_id
        };
    }

    /**
     * Logs in a user
     * 
     * @param {Object} req - request object
     * @returns {{success: Bool, message: String, user_id: Int}} - 
     */
    login(req) {
        // req is a form submission
        if (!req.body.email || !req.body.password) {
            return {
                success: false,
                message: "Missing email or password"
            };
        }

        var user = this.db.select_where('Users', 'email', req.body.email);
        if (user.length < 1) {
            return {
                success: false,
                message: "Email or password is incorrect"
            };
        }

        if (user[0].password === crypto.createHash('sha256').update(req.body.password).digest('hex')) {
            return {
                success: true,
                message: "success",
                user_id: user[0].user_id
            };
        } else {
            return {
                success: false,
                message: "Email or password is incorrect"
            };
        }
    }

    /**
     * Checks if a username or email is already in use
     * 
     * @param {Object} req - request object
     * @returns {Object} - {email_in_use: Bool, username_in_use: Bool}
     */
    check_register(req) {
        // req body is an object with a username and email property
        if (req.body.username && req.body.email) {
            return {
                email_in_use: this.db.select_where('Users', 'email', req.body.email).length > 0,
                username_in_use: this.db.select_where('Users', 'username', req.body.username).length > 0
            };
        } else {
            return {
                email_in_use: false,
                username_in_use: false
            };
        }
    }
}

/**
 * Methods for getting user information from the database.
 */
class Users extends Interface {
    /**
     * TODO: test
     * Gets a user's profile information
     * 
     * @param {String} username - the username
     * 
     * @returns {{ user_id: int, username: string, dateJoined: string, profilePoints: int, pfpUrl: string, profileUrl: string }} - the user's information, or null if the user doesn't exist
     */
    get_user_profile(username) {
        /*
        Returns {
            user_id: (the user's id)
            profileUrl: (url to the user's page)
            pfpUrl: (url to the user's profile picture)
            username: (the user's username)
            dateJoined: (the date the user joined)
            profilePoints: (the user's profile points)
        }
        */
        let user = this.db.select_where('Users', 'username', username);
        if (user.length < 1) {
            return null;
        } else {
            let pfp_url = this.db.select_where('Images', 'image_id', user[0].image_id)[0].image_data;
            let profile_page = `/users/${user[0].username}`;
            let user_profile = [{
                user_id: user[0].user_id,
                username: user[0].username,
                dateJoined: user[0].date_joined,
                profilePoints: user[0].plant_points,
                pfpUrl: pfp_url,
                profileUrl: profile_page
            }]
            return user_profile;
        }
    }

    /**
     * TODO: test + use cookies
     * get all users sorted by their rating
     * 
     * @param {Object} req - request object
     * 
     * @returns {Object} - {success: Bool, message: String, users: Array[Object]}
     *
     */
     get_top_users(req) {
        let users = this.db.all('Users');
        users.sort((a, b) => {
            return b.plant_points - a.plant_points;
        });
        // get the top 10 users
        users = users.slice(0, 10);
        users = users.map(user => {
            let new_user = {
                username: user.username,
                image_url: null,
                plant_points: user.plant_points
            }
            let user_image = this.db.select_where('Images', 'image_id', user.image_id);
            if (user_image.length > 0) {
                new_user.image_url = user_image[0].image_data;
            } else {
                // default
                new_user.image_id = '/default_pfp.png';
            }
            return new_user;
        });
        return {
            success: true,
            message: 'Success',
            users: users
        };
    }
}

/**
 * Stuff for markers
 */
class Markers extends Interface {

    /**
     * Reserves a marker id for a user and returns the id
     * 
     * @param {Object} req - request object
     * 
     * @returns {Object} - {success: Bool, message: String, next_id: Int}
     */
    get_id(req) {
        // check if user_id is not set
        let user_id = req.cookies['user_id'];
        // check if user_id is not an int
        
        if (user_id == undefined || isNaN(user_id)) {
            return {
                success: false,
                message: "Not logged in"
            };
        }
        user_id = parseInt(user_id);
        let user = this.db.select_by_id('Users', user_id);
        if (!user) {
            return {
                success: false,
                message: "User does not exist"
            }
        }
        let next_id = this.db.insert_into('PlantMarkers', {
            user_id: user_id,
            name: '',
            description: '',
            image_id: 0,
            latitude: 0,
            longitude: 0
        })
        return {
            success: true,
            message: "Success",
            next_id: next_id
        }
    }
    /**
     * Adds a marker to the database
     * 
     * @param {Object} req - request object
     * 
     * @returns {Object} - {success: Bool, message: String, plant_marker_id: Int}
     */
    add(req) {
        // check if user_id is not set
        let user_id = req.cookies['user_id'];
        // check if user_id is not an int
        
        if (user_id == undefined || isNaN(user_id)) {
            return {
                success: false,
                message: "Not logged in"
            };
        }
        user_id = parseInt(user_id);
        let user = this.db.select_by_id('Users', user_id);
        if (!user) {
            return {
                success: false,
                message: "User does not exist"
            }
        }
        let plant_marker_id = req.body.plant_marker_id;
        
        // check if plant_marker_id is reserved and belongs to the user
        let marker = this.db.select_by_id('PlantMarkers', plant_marker_id);
        if (marker) {
            if (marker.user_id != user_id) {
                return {
                    success: false,
                    message: "Marker reserved for someone else"
                };
            } else {
                // update the marker
                // first create a new image entry
                let image_id = this.db.insert_into('Images', {
                    image_type: 'url',
                    image_data: req.body.image
                });
                this.db.edit_by_id('PlantMarkers', plant_marker_id, {
                    marker_name: req.body.name,
                    marker_post_date: new Date().toLocaleDateString(),
                    marker_description: req.body.description,
                    marker_lat: req.body.latitude,
                    marker_long: req.body.longitude,
                    marker_image: image_id
                });
                return {
                    success: true,
                    message: "Success",
                    plant_marker_id: plant_marker_id
                };
            }
        } else {
            return {
                success: false,
                message: "id not reserved"
            };
        }
    }

    get(req) {
        // req.body.plant_marker_id

        let raw_marker = this.db.select_by_id('PlantMarkers', req.body.plant_marker_id);
        
        // make sure it's not undefined
        if (raw_marker) {
            let marker = {...raw_marker};  // copy everything over
            marker.plant_ratings = this.db.select_where(
                'UserMarkerRatings',
                'plant_marker_id',
                marker.plant_marker_id
            );
            marker.tags = this.db.select_where(
                'PlantMarkers_PlantTags',
                'plant_marker_id',
                marker.plant_marker_id
            ).map(plant_marker_plant_tag => {
                let tag = this.db.select_by_id(
                    'PlantTags',
                    plant_marker_plant_tag.plant_tag_id
                )[0];
                return tag;
            });
            return {
                success: true,
                message: "success",
                marker: marker
            };
        } else {
            return {
                success: false,
                message: "Marker does not exist"
            };
        }
    }

    /**
     * TODO: test
     * Gets a list of all markers
     * 
     * Markers is a list of objects which have all the same
     * attributes as entries in the plant_markers table
     *     {plant_marker_id, user_id, marker_post_data}
     * plus:
     *     plant_ratings {user_id, plant_marker_id, }
     * 
     * @param {Object} req - request object
     * 
     * @returns {Object} - {success: Bool, message: String, markers: Array[Object]}
     */
    list(req) {
        let raw_markers = this.db.all('PlantMarkers');
        let markers = raw_markers.map(raw_marker => {
            let marker = {...raw_marker};  // copy everything over
            marker.plant_ratings = this.db.select_where(
                'UserMarkerRatings',
                'plant_marker_id',
                marker.plant_marker_id
            );
            marker.tags = this.db.select_where(
                'PlantMarkers_PlantTags',
                'plant_marker_id',
                marker.plant_marker_id
            ).map(plant_marker_plant_tag => {
                let tag = this.db.select_by_id(
                    'PlantTags',
                    plant_marker_plant_tag.plant_tag_id
                )[0];
                return tag;
            });
            return marker;
        });
        return {
            success: true,
            message: 'Success',
            markers: markers
        };
    }

    list_own(req) {
        // check if user_id is not set
        let user_id = req.cookies['user_id'];
        // check if user_id is not an int
        
        if (user_id == undefined || isNaN(user_id)) {
            return {
                success: false,
                message: "Not logged in"
            };
        }
        user_id = parseInt(user_id);
        let user = this.db.select_by_id('Users', user_id);
        if (!user) {
            return {
                success: false,
                message: "User does not exist"
            }
        }
        let username = user.username;
        if (username.length === 0) {
            return {
                success: false,
                message: "Not logged in"
            };
        } else {
            return this.list_user_markers(username);
        }
    }

    /**
     * TODO: test + use cookies
     * Gets a list of all markers owned by a user
     * 
     * same as list() but only returns markers owned by the user
     * 
     * @param {Object} username - the username of the user to get
     * 
     * @returns {Object} - {success: Bool, message: String, markers: Array[Object]}
     */
    list_user_markers(username) {
        let user = this.db.select_where('Users', 'username', username);
        if (user.length === 0) {
            return {
                success: false,
                message: "Invalid User",
                markers: []
            };
        }
        let user_id = user[0].user_id;
        let raw_markers = this.db.select_where('PlantMarkers', 'user_id', user_id);
        let markers = raw_markers.map(raw_marker => {
            let marker = {...raw_marker};  // copy everything over
            // Get a list of all the ratings for this marker
            marker.plant_ratings = this.db.select_where(
                'UserMarkerRatings',
                'plant_marker_id',
                marker.plant_marker_id
            );
            // Get a list of all tags associated with this marker
            marker.tags = this.db.select_where(
                'PlantMarkers_PlantTags',
                'plant_marker_id',
                marker.plant_marker_id
            ).map(plant_marker_plant_tag => {
                let tag = this.db.select_by_id(
                    'PlantTags',
                    plant_marker_plant_tag.plant_tag_id
                )[0];
                return tag;
            });
            return marker;
        });
        return {
            success: true,
            message: 'Success',
            markers: markers
        };
    }

    upvote(req) {
        // check if user_id is not set
        let user_id = req.cookies['user_id'];
        // check if user_id is not an int
        
        if (user_id == undefined || isNaN(user_id)) {
            return {
                success: false,
                message: "Not logged in"
            };
        }
        user_id = parseInt(user_id);
        let user = this.db.select_by_id('Users', user_id);
        if (!user) {
            return {
                success: false,
                message: "User does not exist"
            }
        }
        let plant_marker_id = req.body.plant_marker_id;

        // check if the user has already upvoted this marker
        let upvotes = this.db.select_where_predicate(
            'UserMarkerRatings',
            (rating) => {
                return rating.user_id === user_id && rating.plant_marker_id === plant_marker_id;
            }
        );

        if (upvotes.length > 0) {
            console.log(JSON.stringify(upvotes));
            // check the rating, if it's -1 then simply change it to 1
            if (upvotes[0].user_marker_rating === -1) {
                this.db.edit_by_id(
                    'UserMarkerRatings',
                    upvotes[0].user_marker_rating_id,
                    {
                        user_marker_rating: 1
                    }
                );
                return {
                    success: true,
                    message: 'success'
                };
            } else {
                // user has already upvoted this marker
                return {
                    success: false,
                    message: 'User has already upvoted this marker'
                };
            }
        } else {
            // user has not upvoted this marker
            this.db.insert_into('UserMarkerRatings', {
                user_id: user_id,
                plant_marker_id: plant_marker_id,
                user_marker_rating: 1,
                user_marker_rating_date: new Date().toLocaleDateString()
            });
            return {
                success: true,
                message: 'Success'
            };
        }
        
    }

    downvote(req) {
        // check if user_id is not set
        let user_id = req.cookies['user_id'];
        // check if user_id is not an int
        
        if (user_id == undefined || isNaN(user_id)) {
            return {
                success: false,
                message: "Not logged in"
            };
        }
        user_id = parseInt(user_id);
        let user = this.db.select_by_id('Users', user_id);
        if (!user) {
            return {
                success: false,
                message: "User does not exist"
            }
        }
        let plant_marker_id = req.body.plant_marker_id;

        // check if the user has already upvoted this marker
        let downvotes = this.db.select_where_predicate(
            'UserMarkerRatings',
            (rating) => {
                return rating.user_id === user_id && rating.plant_marker_id === plant_marker_id;
            }
        );

        if (downvotes.length > 0) {
            console.log(JSON.stringify(downvotes));
            // check the rating, if it's -1 then simply change it to 1
            if (downvotes[0].user_marker_rating === 1) {
                this.db.edit_by_id(
                    'UserMarkerRatings',
                    downvotes[0].user_marker_rating_id,
                    {
                        user_marker_rating: -1
                    }
                );
                return {
                    success: true,
                    message: 'success'
                };
            } else {
                // user has already upvoted this marker
                return {
                    success: false,
                    message: 'User has already upvoted this marker'
                };
            }
        } else {
            // user has not upvoted this marker
            this.db.insert_into('UserMarkerRatings', {
                user_id: user_id,
                plant_marker_id: plant_marker_id,
                user_marker_rating: -1,
                user_marker_rating_date: new Date().toLocaleDateString()
            });
            return {
                success: true,
                message: 'Success'
            };
        }
    }

    /**
     * Deletes a marker from the database
     * 
     * @param {Object} req - request object
     * 
     * @returns {Object} - {success: Bool, message: String}
     */
    delete(req) {
        let plant_marker_id = req.body.plant_marker_id;
        if (plant_marker_id == undefined || isNaN(plant_marker_id)) {
            return {
                success: false,
                message: "Invalid plant_marker_id"
            };
        }
        plant_marker_id = parseInt(plant_marker_id);
        let marker = this.db.select_by_id('PlantMarkers', plant_marker_id);
        if (!marker) {
            return {
                success: false,
                message: "Marker does not exist"
            };
        }
        // check if user_id is not set
        let user_id = req.cookies['user_id'];
        // check if user_id is not an int
        
        if (user_id == undefined || isNaN(user_id)) {
            return {
                success: false,
                message: "Not logged in"
            };
        }
        user_id = parseInt(user_id);
        let user = this.db.select_by_id('Users', user_id);
        if (!user) {
            return {
                success: false,
                message: "User does not exist"
            }
        }

        if (marker.user_id === user_id) {
            // user owns the marker
            this.db.delete_by_id('PlantMarkers', plant_marker_id);
            return {
                success: true,
                message: 'Success'
            };
        } else {
            // user does not own the marker
            return {
                success: false,
                message: 'User does not own the marker'
            };
        }
    }

    /**
     * Edits the description of the given marker
     * 
     * @param {Object} req - request object
     * 
     * @returns {Object} - {success: Bool, message: String}
     */
    edit (req) {
        let plant_marker_id = req.body.plant_marker_id;
        if (plant_marker_id == undefined || isNaN(plant_marker_id)) {
            return {
                success: false,
                message: "Invalid plant_marker_id"
            };
        }
        plant_marker_id = parseInt(plant_marker_id);
        let marker = this.db.select_by_id('PlantMarkers', plant_marker_id);
        if (!marker) {
            return {
                success: false,
                message: "Marker does not exist"
            };
        }
        // check if user_id is not set
        let user_id = req.cookies['user_id'];
        // check if user_id is not an int
        if (user_id == undefined || isNaN(user_id)) {
            return {
                success: false,
                message: "Not logged in"
            };
        }
        user_id = parseInt(user_id);
        let user = this.db.select_by_id('Users', user_id);
        if (!user) {
            return {
                success: false,
                message: "User does not exist"
            }
        }

        if (marker.user_id === user_id) {
            // user owns the marker
            let description = req.body.description;
            if (description == undefined) {
                description = '';
            }
            this.db.edit_by_id(
                'PlantMarkers',
                plant_marker_id,
                {
                    marker_description: description
                }
            );
            return {
                success: true,
                message: 'Success'
            };
        } else {
            // user does not own the marker
            return {
                success: false,
                message: 'User does not own the marker'
            };
        }
    }

    check_owner (req) {
        let plant_marker_id = req.body.plant_marker_id;
        if (plant_marker_id == undefined || isNaN(plant_marker_id)) {
            return {
                success: false,
                message: "Invalid plant_marker_id"
            };
        }
        plant_marker_id = parseInt(plant_marker_id);
        let marker = this.db.select_by_id('PlantMarkers', plant_marker_id);
        if (!marker) {
            return {
                success: false,
                message: "Marker does not exist"
            };
        }
        // check if user_id is not set
        let user_id = req.cookies['user_id'];
        // check if user_id is not an int
        if (user_id == undefined || isNaN(user_id)) {
            return {
                success: false,
                message: "Not logged in"
            };
        }
        user_id = parseInt(user_id);
        let user = this.db.select_by_id('Users', user_id);
        if (!user) {
            return {
                success: false,
                message: "User does not exist"
            }
        }

        if (marker.user_id === user_id) {
            // user owns the marker
            return {
                success: true,
                message: 'Success'
            };
        } else {
            // user does not own the marker
            return {
                success: false,
                message: 'User does not own the marker'
            };
        }
    }
}

module.exports = {
    Signup: Signup,
    Users: Users,
    Markers: Markers
}