const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Nachiket Naik",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Nachiket Naik",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		helpText: "This is some helpful text.",
		title: "Help",
		name: "Nachiket Naik",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Address must be provided",
		});
	}

	geocode(req.query.address, (err, { Latitude, Longitude, Location } = {}) => {
		if (err) {
			return res.send({
				error: err,
			});
		}
		forecast(Latitude, Longitude, (err, forecastData) => {
			if (err) {
				return res.send({ error: err });
			}
			res.send({
				forecast: forecastData,
				Location,
				address: req.query.address,
			});
		});
	});
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term",
		});
	}
	console.log(req.query);
	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Nachiket Naik",
		errorMessage: "Help article not found.",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Nachiket Naik",
		errorMessage: "Page not found.",
	});
});

app.listen(port, () => {
	console.log("Server is up on port " + port);
});
