var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();

app.use(cors());
app.use(bodyParser.json());

let students = [
    { "stuno": 1, "name": "Kalaga", "basic": 88234 },
    { "stuno": 2, "name": "Venkata", "basic": 90032 },
    { "stuno": 3, "name": "Surya", "basic": 91153 },
    { "stuno": 4, "name": "Sri Krishna", "basic": 90023 },
    { "stuno": 5, "name": "Gayathri", "basic": 98823 }
];

app.get("/showStudent", (req, res) => {
    res.status(200).json(students);
});

app.get("/searchStudents/:stuno", (req, res) => {
    let found = students.find(item => item.stuno === parseInt(req.params.stuno));
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

app.get("/searchStudentsbyName/:name", (req, res) => {
    let found = students.find(item => item.name === req.params.name);
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

app.listen(1113, () => {
    console.log("Node.js Application Started on port 1113...");
});
