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
        console.log('[Orders_Table] Database connection succeeded!');
    } else {
        console.log('[Orders_Table] Database connection failed \n Error: ' + JSON.stringify(error, undefined, 2));
    }
});

app.post('/create', (req, res) => {    //create a new order in database
    let order = req.body;
    mySqlConnection.query('CALL CreateOrder(?, ?, ?, ?);', [order.CustomerID, order.PerformerID, order.ServiceID, order.OrderStatus], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/', (req, res) => {    //get all orders from database
    mySqlConnection.query('SELECT * FROM Orders;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/customer/:id', (req, res) => {    //get orders by customer id from database
    mySqlConnection.query('SELECT * FROM Orders WHERE CustomerID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/performer/:id', (req, res) => {    //get orders by performer id from database
    mySqlConnection.query('SELECT * FROM Orders WHERE PerformerID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/:id', (req, res) => {    //get order by id from database
    mySqlConnection.query('SELECT * FROM Orders WHERE OrderID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/full/customer/:id', (req, res) => {    //get full order info for customer by id from database
    mySqlConnection.query("SELECT orders.OrderID, orders.ServiceID, socialnetworks.NetworkName, performerservices.ProfileID, performerservices.Subscribers, performerservices.Price, CONCAT(privateusers.Name,' ',privateusers.Surname) AS Performer, users.PhoneNumber, users.Email, orders.OrderStatus FROM orders INNER JOIN performerservices INNER JOIN socialnetworks INNER JOIN users INNER JOIN privateusers WHERE orders.ServiceID = performerservices.ServiceID AND performerservices.SocialNetworkID = socialnetworks.SocialNetworkID AND performerservices.UserID = users.UserID AND users.UserID = privateusers.UserID AND orders.CustomerID = ? UNION SELECT orders.OrderID, orders.ServiceID, socialnetworks.NetworkName, performerservices.ProfileID, performerservices.Subscribers, performerservices.Price, legalusers.CompanyName AS Performer, users.PhoneNumber, users.Email, orders.OrderStatus FROM orders INNER JOIN performerservices INNER JOIN socialnetworks INNER JOIN users INNER JOIN legalusers WHERE orders.ServiceID = performerservices.ServiceID AND performerservices.SocialNetworkID = socialnetworks.SocialNetworkID AND performerservices.UserID = users.UserID AND users.UserID = legalusers.UserID AND orders.CustomerID = ?;", [req.params.id, req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.get('/full/performer/:id', (req, res) => {    //get full order info for performer by id from database
    mySqlConnection.query("SELECT orders.OrderID, orders.ServiceID, socialnetworks.NetworkName, performerservices.ProfileID, performerservices.Subscribers, performerservices.Price, CONCAT(privateusers.Name,' ',privateusers.Surname) AS Customer, users.PhoneNumber, users.Email, orders.OrderStatus FROM orders INNER JOIN performerservices INNER JOIN socialnetworks INNER JOIN users INNER JOIN privateusers WHERE orders.ServiceID = performerservices.ServiceID AND performerservices.SocialNetworkID = socialnetworks.SocialNetworkID AND users.UserID = privateusers.UserID AND orders.CustomerID = users.UserID AND orders.PerformerID = ? UNION SELECT orders.OrderID, orders.ServiceID, socialnetworks.NetworkName, performerservices.ProfileID, performerservices.Subscribers, performerservices.Price, legalusers.CompanyName AS Customer, users.PhoneNumber, users.Email, orders.OrderStatus FROM orders INNER JOIN performerservices INNER JOIN socialnetworks INNER JOIN users INNER JOIN legalusers WHERE orders.ServiceID = performerservices.ServiceID AND performerservices.SocialNetworkID = socialnetworks.SocialNetworkID AND users.UserID = legalusers.UserID AND orders.CustomerID = users.UserID AND orders.PerformerID = ?;", [req.params.id, req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.put('/update', (req, res) => {    //update by id performer service in database
    let order = req.body;
    mySqlConnection.query('UPDATE Orders SET CustomerID = ?, PerformerID = ?, ServiceID = ?, OrderStatus = ? WHERE OrderID = ?;', [order.CustomerID, order.PerformerID, order.ServiceID, order.OrderStatus, order.OrderID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.put('/update/status', (req, res) => {    //update by id performer service in database
    let status = req.body;
    mySqlConnection.query('UPDATE Orders SET OrderStatus = ? WHERE OrderID = ?;', [status.OrderStatus, status.OrderID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

app.delete('/delete/:id', (req, res) => {    //delete by id service from database
    mySqlConnection.query('DELETE FROM Orders WHERE OrderID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send('Deleted successfully!');
        }
        else {
            return res.status(400).send({ message: error });
        }
    });
});

module.exports = app;    //export app object with CRUD functions
