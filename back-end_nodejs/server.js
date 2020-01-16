/* Include modules. */

var express = require("express");

var app = express();

var cors = require("cors");

var bodyParser = require("body-parser");

/* Loading route modules. */

const ordersRoutes = require("./Routes/routes_orders");

const gendersRoutes = require("./Routes/routes_genders");

const countriesRoutes = require("./Routes/routes_countries");

const userTypesRoutes = require("./Routes/routes_user_types");

const adminUsersRoutes = require("./Routes/routes_admin_users");

const legalUsersRoutes = require("./Routes/routes_legal_users");

const privateUsersRoutes = require("./Routes/routes_private_users");

const genderAudienceRoutes = require("./Routes/routes_gender_audience");

const socialNetworksRoutes = require("./Routes/routes_social_networks");

const countryAudienceRoutes = require("./Routes/routes_country_audience");

const performerServicesRoutes = require("./Routes/routes_performer_services");

/* Using included modules. */

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

/* Add catalog routes to middleware chain. */

app.use("/orders", ordersRoutes);

app.use("/genders", gendersRoutes);

app.use("/countries", countriesRoutes);

app.use("/usertypes", userTypesRoutes);

app.use("/adminusers", adminUsersRoutes);

app.use("/legalusers", legalUsersRoutes);

app.use("/privateusers", privateUsersRoutes);

app.use("/genderaudience", genderAudienceRoutes);

app.use("/socialnetworks", socialNetworksRoutes);

app.use("/countryaudience", countryAudienceRoutes);

app.use("/performerservices", performerServicesRoutes);

/* App listening on port. */

app.listen(3000, function () {
	console.log('API app started on localhost:3000!');
});