
// get hashing algorithm
const crypto = require('crypto');

class Interface {
    constructor (db) {
        this.db = db;
    }
}

class Signup extends Interface {
    signup(req, res) {
        // req is a form submission
        console.log('== Signup ==');
        if (req.body.username && req.body.password && req.body.email) {
            // make sure the username and email are unique
            if (this.db.select_where('Users', 'username', req.body.username).length > 0) {
                res.status(400).send('Username already exists.');
            } else if (this.db.select_where('Users', 'email', req.body.email).length > 0) {
                res.status(400).send('Email already exists.');
            } else {
                this.db.insert_into('Users', {
                    name: req.body.username,
                    plant_points: 0,
                    date_joined: new Date().toLocaleDateString(),
                    email: req.body.email,
                    password: crypto.createHash('sha256').update(req.body.password).digest('hex')
                });
                console.log(JSON.stringify(this.db.select_where('Users', 'email', req.body.email)));
                res.status(200).send('Success');
            }
        } else {
            res.status(400).send('Missing username, password, or email.');
        }
    }

    login(req, res) {
        // req is a form submission
        console.log('== Login ==');
        if (req.body.email && req.body.password) {
            var user = this.db.select_where('Users', 'email', req.body.email);
            if (user.length > 0) {
                if (user[0].password == crypto.createHash('sha256').update(req.body.password).digest('hex')) {
                    res.cookie('username', user[0].name);
                    res.status(200).send('Success');
                } else {
                    res.status(400).send('Email or password is incorrect.');
                }
            } else {
                res.status(400).send('Email or password is incorrect.');
            }
        } else {
            res.status(400).send('Missing email or password.');
        }
    }
}

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