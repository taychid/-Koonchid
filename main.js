var express = require('express');
var app = express();

//Setup Mongo connection
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mean.psu.ac.th:27017/";
var options = {useUnifiedTopology: true, useNewUrlParser: true};

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get("/", function(req, res){

    res.render('pages/index');
});

app.get("/products", function(req, res){
    //Get data from MonfoDB
    MongoClient.connect(url, options,  function(err, db) {
        if (err) throw err;
       var dbo = db.db("fullstack");
        var query = {}
        dbo.collection("products").find(query).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          res.render('pages/products',{products:result});
          db.close();
        });
      });
});

app.get("/productdetail/:id", function(req, res){
    var product = req.params.id;

    MongoClient.connect(url, options,  function(err, db) {
        if (err) throw err;
       var dbo = db.db("fullstack");
        var query = {ProductID: product};
        dbo.collection("products").findOne(query, function(err, result) {
          if (err) throw err;
          //console.log(result);
          res.render('pages/productdetail',{detail:result});
          db.close();
        });
      });
});

app.listen(8080);
console.log('Express started at http://localhost:8080');