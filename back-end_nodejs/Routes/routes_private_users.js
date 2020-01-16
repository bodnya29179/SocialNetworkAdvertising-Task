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
        console.log('[PrivateUsers_Table] Database connection succeeded!');
    } else {
        console.log('[PrivateUsers_Table] Database connection failed \n Error: ' + JSON.stringify(error, undefined, 2));
    }
});

app.post('/create', (req, res) => {    //create a new private user in database
    let privateuser = req.body;
    mySqlConnection.query("CALL CreatePrivateUser(?, ?, ?, ?, ?, ?, ?);", [privateuser.Name, privateuser.Surname, privateuser.CountryID, privateuser.PhoneNumber, privateuser.Email, privateuser.Password, privateuser.TypeID], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/', (req, res) => {    //get all private users from database
    mySqlConnection.query('SELECT Users.UserID, PrivateUsers.Name, PrivateUsers.Surname, Users.CountryID, Users.PhoneNumber, Users.Email, Users.Password, Users.TypeID FROM Users INNER JOIN PrivateUsers WHERE Users.UserID = PrivateUsers.UserID;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/:id', (req, res) => {    //get legal user by id from database
    mySqlConnection.query('SELECT Users.UserID, PrivateUsers.Name, PrivateUsers.Surname, Users.CountryID, Users.PhoneNumber, Users.Email, Users.Password, Users.TypeID FROM Users INNER JOIN PrivateUsers WHERE Users.UserID = PrivateUsers.UserID AND Users.UserID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.put('/update', (req, res) => {    //update by id legal user in database
    let privateuser = req.body;
    mySqlConnection.query('UPDATE PrivateUsers SET Name = ?, Surname = ? WHERE UserID = ?; UPDATE Users SET Users.CountryID = ?, Users.PhoneNumber = ?, Users.Email = ?, Users.Password = ?, Users.TypeID = ? WHERE UserID = ?;', [privateuser.Name, privateuser.Surname, privateuser.UserID, privateuser.CountryID, privateuser.PhoneNumber, privateuser.Email, privateuser.Password, privateuser.TypeID, privateuser.UserID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.delete('/delete/:id', (req, res) => {    //delete by id legal user from database
    mySqlConnection.query('DELETE FROM PrivateUsers WHERE UserID = ?; DELETE FROM Users WHERE UserID = ?;', [req.params.id, req.params.id], (error, results, fields) => {
        if (!error) {
            res.send('Deleted successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

module.exports = app;    //export app object with CRUD functions
