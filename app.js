var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer");

// APP CONFIG
mongoose.connect('mongodb://mongo:27017/my_little_pony_app', { useNewUrlParser: true }).then(function(){
    //connected successfully
    console.log('Successfully connected to database');
}, function(err) {
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

// Pony.create({
// 	name: "Pinkie Pie",
// 	color: "Pink",
// 	image: "https://vignette.wikia.nocookie.net/deathbattlefanon/images/d/db/440px-Canterlot_Castle_Pinkie_Pie_1.png",
// 	description: "This is just a test"
// }, function(err, ponies){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("Here is the pony " + ponies.name + ".");
// 		console.log(ponies);
// 	}
// });

// RESTFUL Routes
app.get("/", function(req, res){
	res.send("Just Seeing If I Can See You!");
});

// Index Route
app.get("/ponies", function(req, res){
	Pony.find({}, function(err, allPonys){
		if(err){
			console.log(err);
		} else {
			res.render("index", {ponys: allPonys});
		}
	});
});
// New Route
app.get("/ponies/new", function(req, res){
	res.render("new");
});
// Create Route
app.post("/ponies", function(req, res){
	Pony.create(req.body.ponies, function(err, newPony){
		if(err){
			console.log(err);
		} else {
			res.redirect("/ponies");
		}
	});
});


//Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("Server has Started!!!");
});