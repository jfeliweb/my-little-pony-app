var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer");

// APP CONFIG
// mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));


app.get("/", function(req, res){
	res.send("Just Seeing If I Can See You!");
});



//Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("Server has Started!!!");
});