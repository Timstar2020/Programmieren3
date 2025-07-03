var express = require("express");
var app = express();

// app.get("/loop1", function(req, res){
//     res.redirect('localhost:3000/loop2');
// });

// app.get("/loop2", function(req, res){
//     res.redirect('localhost:3000/loop1');
// });

// app.get("/hello", function(req, res){
//     res.send('<h1>Hello world</h1>');
// });

// app.get("/{*any}", function(req, res){
//     res.send('<h1>404 page not found</h1>');
// });


// app.listen(3000, function(){
//     console.log("Example is running on port 3000");
// });

app.use(express.static("pr2"));

app.get("/", function(req, res){

res.redirect("index.html");

});

app.listen(3000, function(){

console.log("Example is running on port 3000");
});