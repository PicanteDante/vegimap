
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
     * @returns {[Bool, String]} - [success, user_id or message]
     */
    register(req) {
        // first check if username is between 3-20 characters
        if (req.body.username.length < 3 || req.body.username.length > 20) {
            return [false, "Username must be between 3-20 characters"];
        }
        // check if username is alphanumeric including underscores
        if (!/^[a-zA-Z0-9_]+$/.test(req.body.username)) {
            return [false, "Username must be alphanumeric"];
        }
        // check if email is valid
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
            return [false, "Invalid email"];
        }
        // check if password is between 6-20 characters
        if (req.body.password.length < 6 || req.body.password.length > 20) {
            return [false, "Password must be between 6-20 characters"];
        }
        // check if email or username is already in use
        var check = this.check_register(req);
        if (check[0]) {
            return [false, 'Email is already in use'];
        } else if (check[1]) {
            return [false, 'Username is already in use'];
        }
        
        // hash password
        var password = crypto.createHash('sha256').update(req.body.password).digest('hex');

        // insert into database
        this.db.insert_into('Users', {
            name: req.body.username,
            plant_points: 0,
            date_joined: new Date().toLocaleDateString(),
            email: req.body.email,
            password: password
        });
        let user_id = this.db.select_where('Users', 'name', req.body.username)[0].user_id;
        return [true, user_id];
    }

    /**
     * Logs in a user
     * 
     * @param {Object} req - request object
     * @returns {(Bool, String)} - success, error message
     */
    login(req) {
        // req is a form submission
        if (!req.body.email || !req.body.password) {
            return [false, 'Missing email or password.'];
        }

        var user = this.db.select_where('Users', 'email', req.body.email);
        if (user.length < 1) {
            return [false, 'Email or password is incorrect.'];
        }

        if (user[0].password == crypto.createHash('sha256').update(req.body.password).digest('hex')) {
            return [true, this.db.select_where('Users', 'email', req.body.email)[0].user_id];
        } else {
            return [false, 'Email or password is incorrect.'];
        }
    }

    /**
     * Checks if a username or email is already in use
     * 
     * @param {Object} req - request object
     * @returns {[Bool, Bool]} - email in use, username in use
     */
    check_register(req) {
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

    /**
     * Checks if a username and password are correct
     * 
     * @param {Object} req - request object
     * @returns {Bool} - whether the username and password are correct
     */
    check_login(req) {
        // req body is an object with a username and password property
        if (req.body.username && req.body.password) {
            var user = this.db.select_where('Users', 'name', req.body.username);
            if (user.length > 0) {
                if (user[0].password == crypto.createHash('sha256').update(req.body.password).digest('hex')) {
                    return [true, 'success'];
                }
            }
            return [false, 'Username or password is incorrect.'];
        } else {
            return [false, 'Missing username or password.'];
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