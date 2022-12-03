
// get hashing algorithm
const crypto = require('crypto');

class Interface {
    constructor (db) {
        this.db = db;
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
     * @returns {[Bool, String]} - success, error message
     */
    signup(req) {
        // req is a form submission
        if (req.body.username && req.body.password && req.body.email) {
            // make sure the username and email are unique
            if (this.db.select_where('Users', 'username', req.body.username).length > 0) {
                return [false, 'Username already exists.'];
            } else if (this.db.select_where('Users', 'email', req.body.email).length > 0) {
                return [false, 'Email already exists.'];
            } else {
                this.db.insert_into('Users', {
                    name: req.body.username,
                    plant_points: 0,
                    date_joined: new Date().toLocaleDateString(),
                    email: req.body.email,
                    password: crypto.createHash('sha256').update(req.body.password).digest('hex')
                });
                return [true, 'Success'];
            }
        } else {
            return [false, 'Missing username, password, or email.'];
        }
    }

    /**
     * Logs in a user
     * 
     * @param {Object} req - request object
     * @returns {(Bool, String)} - success, error message
     */
    login(req) {
        // req is a form submission
        if (req.body.email && req.body.password) {
            var user = this.db.select_where('Users', 'email', req.body.email);
            if (user.length > 0) {
                if (user[0].password == crypto.createHash('sha256').update(req.body.password).digest('hex')) {
                    return [true, 'Success'];
                } else {
                    return [false, 'Email or password is incorrect.'];
                }
            } else {
                return [false, 'Email or password is incorrect.'];
            }
        } else {
            return [false, 'Missing email or password.'];
        }
    }

    /**
     * Checks if a username or email is already in use
     * 
     * @param {Object} req - request object
     * @returns {[Bool, Bool]} - email in use, username in use
     */
    check(req) {
        // req body is an object with a username and email property
        if (req.body.username && req.body.email) {
            return [
                this.db.select_where('Users', 'email', req.body.email).length > 0,
                this.db.select_where('Users', 'name', req.body.username).length > 0
            ];
        } else {
            return [false, false];
        }
    }
}

/**
 * Methods for getting user information from the database.
 */
class Profiles extends Interface {
    get_profile(req, res) {
        // req.body could have either a username, email, or user_id
        if (req.body.username) {
            matches = this.db.select_where('users', 'username', req.body.username);
        } else if (req.body.email) {
            matches = this.db.select_where('users', 'email', req.body.email);
        } else if (req.body.user_id) {
            matches = this.db.select_by_id('users', req.body.user_id);
        } else {
            res.status(400).send(JSON.stringify({
                success: false,
                message: 'No username, email, or user_id provided.'
            }));
            return;
        }
        if (matches.length > 0) {
            res.status(200).send(JSON.stringify({
                success: true,
                message: 'Success',
                data: matches[0]
            }));
        } else {
            res.status(400).send(JSON.stringify({
                success: false,
                message: 'No matches found.'
            }));
        }
    }
}

module.exports = {
    Signup: Signup
}