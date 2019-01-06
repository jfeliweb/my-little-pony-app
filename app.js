var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer");

// APP CONFIG
mongoose.connect('mongodb://mongo:27017/my_little_pony_app', {
	useNewUrlParser: true
}).then(function () {
	//connected successfully
	console.log('Successfully connected to database');
}, function (err) {
	//err handle
	console.log('Not connected to database ' + err);
});

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Mongoose/Model Config
var ponySchema = new mongoose.Schema({
	name: String,
	color: String,
	image: String,
	description: String
});

var Pony = mongoose.model("Pony", ponySchema);

// RESTFUL Routes
app.get("/", function (req, res) {
	res.redirect("/ponies");
});

// Index Route
app.get("/ponies", function (req, res) {
	Pony.find({}, function (err, allPonys) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {
				ponys: allPonys
			});
		}
	});
});
// New Route
app.get("/ponies/new", function (req, res) {
	res.render("new");
});
// Create Route
app.post("/ponies", function (req, res) {
	Pony.create(req.body.ponys, function (err, newPony) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/ponies");
		}
	});
});
// Show Route
app.get("/ponies/:id", function (req, res) {
	Pony.findById(req.params.id, function (err, foundPony) {
		if (err) {
			console.log(err);
		} else {
			res.render("show", {
				ponys: foundPony
			});
		}
	});
});
// Edit Route
app.get("/ponies/:id/edit", function (req, res) {
	Pony.findById(req.params.id, function (err, foundPony) {
		if (err) {
			console.log(err);
		} else {
			res.render("edit", {
				ponys: foundPony
			});
		}
	});
});
// Update Route
app.put("/ponies/:id", function (req, res) {
	Pony.findByIdAndUpdate(req.params.id, req.body.ponys, function (err, updatePony) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/ponies/" + req.params.id);
		}
	});
});
// Delete Route
app.delete("/ponies/:id", function (req, res) {
	Pony.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/ponies");
		}
	});
});

//Tell Express to listen for requests (start server)
app.listen(3000, function () {
	console.log("Server has Started!!!");
});