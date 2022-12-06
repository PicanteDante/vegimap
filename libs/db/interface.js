
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
     * @param {Object} req - request object
     * @returns {Object} - {success: Bool, message: String, user_id: Int}
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
     * @returns Object} - {success: Bool, message: String, user_id: Int}
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

        if (user[0].password == crypto.createHash('sha256').update(req.body.password).digest('hex')) {
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
     * @returns {Object} - the user's information, or null if the user doesn't exist
     */
    get_user_profile(username) {
        /*
        Get's the user id from req.
        Returns {
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
            let pfp_url = this.db.select_where('Images', 'image_id', user[0].image_id);
            let profile_page = `/users/${user[0].username}`;
            let user_profile = [{
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
     * @example
     *     let response = get_sorted_users(req);
     *     if (response.success) {
     *        // do something with response.users
     *     } else {
     *        // do something with response.message
     *     }
     *
     */
     get_top_users(req) {
        let users = this.db.all('Users');
        users.sort((a, b) => {
            return b.plant_points - a.plant_points;
        });
        // get the top 10 users
        users = users.slice(0, 10);
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

    get_id(req) {
        // Reserve an id by inserting a row into the database
        let user_id = this.db.create_marker();
        let next_id = db.tables['PlantMarkers'].auto_id;
	    db.tables['PlantMarkers'].auto_id++;
        return next_id;
    }
    /**
     * TODO: test + use cookies
     * Adds a marker to the database
     * 
     * @param {Object} req - request object
     * 
     * @returns {Object} - {success: Bool, message: String, plant_marker_id: Int}
     */
    add(req) {
        // check if user_id is not set
        if (req.cookies.user_id == undefined) {
            return {
                success: false,
                message: "Not logged in"
            };
        }
        if (!req.body.lat || !req.body.lng || !req.body.name) {
            return {
                success: false,
                message: "Missing required fields"
            };
        }
        let plant_marker_id = this.db.insert_into('PlantMarkers', {
            user_id: req.cookies.user_id,
            latitude: req.body.lat,
            longitude: req.body.lng,
            name: req.body.name,
            description: req.body.description,
            date_added: new Date().toLocaleDateString()
        });
        return {
            success: true,
            message: "success",
            plant_marker_id: plant_marker_id
        };
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

    /**
     * TODO: test + use cookies
     * Gets a list of all markers owned by a user
     * 
     * same as list() but only returns markers owned by the user
     * 
     * @param {Object} req - request object
     * 
     * @returns {Object} - {success: Bool, message: String, markers: Array[Object]}
     */
    list_own(req) {
        let user_id = req.cookies['user_id'];
        // check if user_id is not an int
        
        if (user_id == undefined || isNaN(user_id)) {
            return {
                success: false,
                message: "Not logged in"
            };
        }
        user_id = parseInt(user_id);
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

    update(req) {

    }

    upvote(req) {
        let user_id = req.body.user_id;
        let plant_marker_id = req.body.plant_marker_id;

        // check if the user has already upvoted this marker
        let upvotes = this.db.select_where_predicate(
            'UserMarkerRatings',
            (rating) => {
                return rating.user_id == user_id && rating.plant_marker_id == plant_marker_id;
            }
        );

        if (upvotes.length > 0) {
            // user has already upvoted this marker
            return {
                success: false,
                message: 'User has already upvoted this marker'
            };
        } else {
            // user has not upvoted this marker
            this.db.insert('UserMarkerRatings', {
                user_id: user_id,
                plant_marker_id: plant_marker_id,
                rating: 1,
                timestamp: new Date()
            });
            return {
                success: true,
                message: 'Success'
            };
        }
        
    }

    downvote(req) {
        let user_id = req.body.user_id;
        let plant_marker_id = req.body.plant_marker_id;

        // check if the user has already upvoted this marker
        let upvotes = this.db.select_where_predicate(
            'UserMarkerRatings',
            (rating) => {
                return rating.user_id == user_id && rating.plant_marker_id == plant_marker_id;
            }
        );

        if (upvotes.length > 0) {
            // user has already upvoted this marker
            return {
                success: false,
                message: 'User has already upvoted this marker'
            };
        } else {
            // user has not upvoted this marker
            this.db.insert('UserMarkerRatings', {
                user_id: user_id,
                plant_marker_id: plant_marker_id,
                rating: -1,
                timestamp: new Date()
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
        let user_id = req.body.user_id;

        // check if the user owns the marker
        let markers = this.db.select_where_predicate(
            'PlantMarkers',
            (marker) => {
                return marker.plant_marker_id == plant_marker_id && marker.user_id == user_id;
            }
        );

        if (markers.length > 0) {
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
}

module.exports = {
    Signup: Signup,
    Users: Users,
    Markers: Markers
}