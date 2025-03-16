var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

app.use(bodyParser.json());
app.use(cors());

let users = [
    {"username":"Ashish","password":"Ashish"},
    {"username":"Sravani","password":"SaiSrav"},
    {"username":"Neha","password":"Goyal"},
    {"username":"Isha","password":"Ghosh"},
   
]

app.get("/showuser", (req,res) => {
    res.status(200).json(users);
})

app.post('/adduser', function (req, res) {
   
    let newItem = {
        username: req.body.username,
        password: req.body.password,
     
    }

    users.push(newItem);

    res.status(201).json({
        'message': "successfully created"
    });
});

app.get("/searchuser/:username", (req, res) => {
    let found = users.find(function (item) {
        return item.username === req.params.username;
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
})

// Route to validate username and password
app.get("/validate/:username/:password", (req, res) => {
    let { username, password } = req.params;

    let found = users.find(user => user.username === username && user.password === password);
    
    if (found) {
        res.status(200).json({ message: "Validation successful", user: found });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});


app.listen(2222, (req, res) => {
    console.log("Node Js Application Started...1114");
})