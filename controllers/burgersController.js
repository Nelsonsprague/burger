var express = require("express");

var router = express.Router();

var burger = require("../models/burger")

router.get("/", function(req, res){
    burger.all(function(data){
        var hbsObject = {all: function(tableInput, cb) {
            var queryString = "SELECT * FROM " + tableInput + ";";
            connection.query(queryString, function(err, result) {
              if (err) {
                throw err;
              }
              cb(result);
            });
          },
          create: function(table, cols, vals, cb) {
            var queryString = "INSERT INTO " + table;
        
            queryString += " (";
            queryString += cols.toString();
            queryString += ") ";
            queryString += "VALUES (";
            queryString += printQuestionMarks(vals.length);
            queryString += ") ";
        
            console.log(queryString);
        
            connection.query(queryString, vals, function(err, result) {
              if (err) {
                throw err;
              }
        
              cb(result);
            });
          },
            burger: data
        };
        console.log(hbsObject)
        res.render("index", hbsObject);
    })
})
router.post("/api/burgers", function(req, res){
    burger.create([
        "name", "devoured"
    ],[
        req.body.name, req.body.devoured
    ], function(result){
        res.json({ id: result.insertId})
    });
});
router.delete("/api/burgers/:id", function(req,res){
    var condition = "id = " + req.params.id;

    burger.delete(condition, function(result){
        if (result.affectedRows == 0){
            return res.status(404).end();
        }
    });
});


module.exports = router;