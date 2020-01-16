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
        console.log('[PerformerServices_Table] Database connection succeeded!');
    } else {
        console.log('[PerformerServices_Table] Database connection failed \n Error: ' + JSON.stringify(error, undefined, 2));
    }
});

app.post('/create', (req, res) => {    //create a new performer service in database
    let service = req.body;
    mySqlConnection.query('CALL CreatePerformerService(?, ?, ?, ?, ?);', [service.UserID, service.SocialNetworkID, service.ProfileID, service.Subscribers, service.Price], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.post('/create/full', (req, res) => {    //create a new performer service with country and gender audience in database
    let service = req.body;
    mySqlConnection.query('CALL CreatePerformerServiceWithCountryAndGenderAudience(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [service.UserID, service.SocialNetworkID, service.ProfileID, service.Subscribers, service.Price, service.GenderID1, service.ManAudience, service.GenderID2, service.WomanAudience, service.CountryID1, service.CountryAudience1, service.CountryID2, service.CountryAudience2, service.CountryID3, service.CountryAudience3, service.CountryID4, service.CountryAudience4, service.CountryID5, service.CountryAudience5], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/', (req, res) => {    //get all performer's services from database
    mySqlConnection.query('SELECT * FROM PerformerServices;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/full/countryaudience', (req, res) => {    //get all performer's services with full information from database
    mySqlConnection.query("SELECT performerservices.ServiceID, performerservices.UserID, socialnetworks.NetworkName, performerservices.ProfileID, performerservices.Subscribers, group_concat(concat(countries.CountryName, ' - ',countryaudience.AudiencePercentage, '%') separator ',  ') AS CountryAudience, performerservices.Price, legalusers.CompanyName AS Performer FROM performerservices INNER JOIN legalusers INNER JOIN socialnetworks INNER JOIN countryaudience INNER JOIN countries WHERE performerservices.UserID = legalusers.UserID AND socialnetworks.SocialNetworkID = performerservices.SocialNetworkID AND performerservices.ServiceID = countryaudience.ServiceID AND countries.CountryID = countryaudience.CountryID GROUP BY performerservices.ServiceID UNION SELECT performerservices.ServiceID, performerservices.UserID, socialnetworks.NetworkName, performerservices.ProfileID, performerservices.Subscribers, group_concat(concat(countries.CountryName, ' - ',countryaudience.AudiencePercentage, '%') separator ',  ') AS CountryAudience, performerservices.Price, CONCAT(privateusers.Name,' ',privateusers.Surname) AS Performer FROM performerservices INNER JOIN privateusers INNER JOIN socialnetworks INNER JOIN countryaudience INNER JOIN countries WHERE performerservices.UserID = privateusers.UserID AND socialnetworks.SocialNetworkID = performerservices.SocialNetworkID AND performerservices.ServiceID = countryaudience.ServiceID AND countries.CountryID = countryaudience.CountryID GROUP BY performerservices.ServiceID;", (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/full/genderaudience', (req, res) => {    //get all performer's services with full information from database
    mySqlConnection.query("SELECT performerservices.ServiceID, performerservices.UserID, socialnetworks.NetworkName, performerservices.ProfileID, performerservices.Subscribers, group_concat(concat(genders.GenderName, ' - ',genderaudience.AudiencePercentage, '%') separator ',  ') AS GenderAudience, performerservices.Price, legalusers.CompanyName AS Performer FROM performerservices INNER JOIN legalusers INNER JOIN socialnetworks INNER JOIN genderaudience INNER JOIN genders WHERE performerservices.UserID = legalusers.UserID AND socialnetworks.SocialNetworkID = performerservices.SocialNetworkID AND performerservices.ServiceID = genderaudience.ServiceID AND genders.GenderID = genderaudience.GenderID GROUP BY performerservices.ServiceID UNION SELECT performerservices.ServiceID, performerservices.UserID, socialnetworks.NetworkName, performerservices.ProfileID, performerservices.Subscribers, group_concat(concat(genders.GenderName, ' - ',genderaudience.AudiencePercentage, '%') separator ',  ') AS GenderAudience, performerservices.Price, CONCAT(privateusers.Name,' ',privateusers.Surname) AS Performer FROM performerservices INNER JOIN privateusers INNER JOIN socialnetworks INNER JOIN genderaudience INNER JOIN genders WHERE performerservices.UserID = privateusers.UserID AND socialnetworks.SocialNetworkID = performerservices.SocialNetworkID AND performerservices.ServiceID = genderaudience.ServiceID AND genders.GenderID = genderaudience.GenderID GROUP BY performerservices.ServiceID;", (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/:id', (req, res) => {    //get services by performer id from database
    mySqlConnection.query('SELECT * FROM PerformerServices WHERE ServiceID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.put('/update', (req, res) => {    //update by id performer service in database
    let service = req.body;
    mySqlConnection.query('UPDATE PerformerServices SET UserID = ?, SocialNetworkID = ?, ProfileID = ?, Subscribers = ?, Price = ? WHERE ServiceID = ?;', [service.UserID, service.SocialNetworkID, service.ProfileID, service.Subscribers, service.Price, service.ServiceID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.delete('/delete/:id', (req, res) => {    //delete by id service from database
    mySqlConnection.query('DELETE FROM PerformerServices WHERE ServiceID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send('Deleted successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

module.exports = app;    //export app object with CRUD functions
