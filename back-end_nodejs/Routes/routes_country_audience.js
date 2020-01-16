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
        console.log('[CountryAudience_Table] Database connection succeeded!');
    } else {
        console.log('[CountryAudience_Table] Database connection failed \n Error: ' + JSON.stringify(error, undefined, 2));
    }
});

app.post('/create', (req, res) => {    //create a new entry with audience in database
    let country = req.body;
    mySqlConnection.query('INSERT INTO CountryAudience VALUES (?, ?, ?);', [country.ServiceID, country.CountryID, country.AudiencePercentage], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/', (req, res) => {    //get all countries audience from database
    mySqlConnection.query('SELECT * FROM CountryAudience;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/:id1/:id2', (req, res) => {    //get country audience by service id from database
    mySqlConnection.query('SELECT * FROM CountryAudience WHERE ServiceID = ? AND CountryID = ?;', [req.params.id1, req.params.id2], (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.put('/update', (req, res) => {    //update country audience percentage by service id and gender id in database
    let country = req.body;
    mySqlConnection.query('UPDATE CountryAudience SET AudiencePercentage = ? WHERE ServiceID = ? AND CountryID = ?;', [country.AudiencePercentage, country.ServiceID, country.CountryID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.delete('/delete/:id1/:id2', (req, res) => {    //delete by id country audience from database
    mySqlConnection.query('DELETE FROM CountryAudience WHERE ServiceID = ? AND CountryID = ?;', [req.params.id1, req.params.id2], (error, results, fields) => {
        if (!error) {
            res.send('Deleted successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

module.exports = app;    //export app object with CRUD functions
