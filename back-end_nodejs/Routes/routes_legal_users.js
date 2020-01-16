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
    database: "SocialNetworksAdvertising",
    multipleStatements: true
});

mySqlConnection.connect((error) => {    //make to connection to the database
    if (!error) {
        console.log('[LegalUsers_Table] Database connection succeeded!');
    } else {
        console.log('[LegalUsers_Table] Database connection failed \n Error: ' + JSON.stringify(error, undefined, 2));
    }
});

app.post('/create', (req, res) => {    //create a new legal user in database
    let legaluser = req.body;
    mySqlConnection.query("CALL CreateLegalUser(?, ?, ?, ?, ?, ?);", [legaluser.CompanyName, legaluser.CountryID, legaluser.PhoneNumber, legaluser.Email, legaluser.Password, legaluser.TypeID], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/', (req, res) => {    //get all legal users from database
    mySqlConnection.query('SELECT Users.UserID, LegalUsers.CompanyName, Users.CountryID, Users.PhoneNumber, Users.Email, Users.Password, Users.TypeID FROM Users INNER JOIN LegalUsers WHERE Users.UserID = LegalUsers.UserID;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/:id', (req, res) => {    //get legal user by id from database
    mySqlConnection.query('SELECT Users.UserID, LegalUsers.CompanyName, Users.CountryID,  Users.PhoneNumber, Users.Email, Users.Password, Users.TypeID FROM Users INNER JOIN LegalUsers WHERE Users.UserID = LegalUsers.UserID AND Users.UserID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.put('/update', (req, res) => {    //update by id legal user in database
    let legaluser = req.body;
    mySqlConnection.query('UPDATE LegalUsers SET CompanyName = ? WHERE UserID = ?; UPDATE Users SET Users.CountryID = ?, Users.PhoneNumber = ?, Users.Email = ?, Users.Password = ?, Users.TypeID = ? WHERE UserID = ?;', [legaluser.CompanyName, legaluser.UserID, legaluser.CountryID, legaluser.PhoneNumber, legaluser.Email, legaluser.Password, legaluser.TypeID, legaluser.UserID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.delete('/delete/:id', (req, res) => {    //delete by id legal user from database
    mySqlConnection.query('DELETE FROM LegalUsers WHERE UserID = ?; DELETE FROM Users WHERE UserID = ?;', [req.params.id, req.params.id], (error, results, fields) => {
        if (!error) {
            res.send('Deleted successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

module.exports = app;    //export app object with CRUD functions
