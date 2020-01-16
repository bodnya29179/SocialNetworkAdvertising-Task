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
        console.log('[SocialNetworks_Table] Database connection succeeded!');
    } else {
        console.log('[SocialNetworks_Table] Database connection failed \n Error: ' + JSON.stringify(error, undefined, 2));
    }
});

app.post('/create', (req, res) => {    //create a new social network in database
    let network = req.body;
    mySqlConnection.query('CALL CreateSocialNetwork(?);', [network.NetworkName], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/', (req, res) => {    //get all social networks from database
    mySqlConnection.query('SELECT * FROM SocialNetworks;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/:id', (req, res) => {    //get social network by id from database
    mySqlConnection.query('SELECT * FROM SocialNetworks WHERE SocialNetworkID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.put('/update', (req, res) => {    //update by id social network in database
    let network = req.body;
    mySqlConnection.query('UPDATE SocialNetworks SET NetworkName = ? WHERE SocialNetworkID = ?;', [network.NetworkName, network.SocialNetworkID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.delete('/delete/:id', (req, res) => {    //delete by id gender from database
    mySqlConnection.query('DELETE FROM SocialNetworks WHERE SocialNetworkID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send('Deleted successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

module.exports = app;    //export app object with CRUD functions
