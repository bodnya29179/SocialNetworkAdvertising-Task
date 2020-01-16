var express = require("express");    //include express module

var bodyParser = require("body-parser");    //include body-parser module

var mysql = require('mysql');    //include mysql module

var cors = require('cors');    //include cors module

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

var mySqlConnection = mysql.createConnection({    //create a connection variable with the required details
    host: "localhost",
    user: "root",
    password: "",
    database: "SocialNetworksAdvertising"
});

mySqlConnection.connect((error) => {    //make to connection to the database
    if (!error) {
        console.log('[GenderAudience_Table] Database connection succeeded!');
    } else {
        console.log('[GenderAudience_Table] Database connection failed \n Error: ' + JSON.stringify(error, undefined, 2));
    }
});

app.post('/create', (req, res) => {    //create a new entry with audience in database
    let gender = req.body;
    mySqlConnection.query('INSERT INTO GenderAudience VALUES (?, ?, ?);', [gender.ServiceID, gender.GenderID, gender.AudiencePercentage], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/', (req, res) => {    //get all gender audience from database
    mySqlConnection.query('SELECT * FROM GenderAudience;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/:id1/:id2', (req, res) => {    //get gender audience by service id from database
    mySqlConnection.query('SELECT * FROM GenderAudience WHERE ServiceID = ? AND GenderID = ?;', [req.params.id1, req.params.id2], (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.put('/update', (req, res) => {    //update gender audience percentage by service id and gender id in database
    let gender = req.body;
    mySqlConnection.query('UPDATE GenderAudience SET AudiencePercentage = ? WHERE ServiceID = ? AND GenderID = ?;', [gender.AudiencePercentage, gender.ServiceID, gender.GenderID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.delete('/delete/:id1/:id2', (req, res) => {    //delete by id gender audience from database
    mySqlConnection.query('DELETE FROM GenderAudience WHERE ServiceID = ? AND GenderID = ?;', [req.params.id1, req.params.id2], (error, results, fields) => {
        if (!error) {
            res.send('Deleted successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

module.exports = app;    //export app object with CRUD functions
