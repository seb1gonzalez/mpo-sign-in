var express = require('express');
var app = express();



function get_acc_values(){
    var input = '';
    app.post('backend\\newAccount.js', function(req, res){
        input = req;
    });
    return input;
}

//Function that processes the array info to put in MySQL
function process_array(input){
    var new_acc_info = {"First_Name":"","Last_Name":"","email":"","Organization":"","password":""};
    for(var key in input){
        new_acc_info[input[key]["value"]] = input[key]["value"];
    }
    return new_acc_info;
}

var input = get_acc_values();
input = process_array(input);

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "irpsrvgis35.utep.edu",
    user: "ctis",
    password: "19691963",
    database: "project_request_form"
});

con.connect(function(err) {
    if (err)
        alert("Connection Error");
    console.log("Connected!");
    var sql = "INSERT INTO log_in_users (first_name,last_name,email,organization,pass) VALUES ?"

    con.query(sql,[input], function (err, result) {
        if (err) throw err;
        alert("Query Executed Correctly");
        console.log("Query Correct");
      });
});