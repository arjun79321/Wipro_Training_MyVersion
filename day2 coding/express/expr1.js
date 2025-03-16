var express = require("express");
var app=express();
app.get("/", (req, res) => {
    res.send("My First Service in Express JS...");
})
app.listen(1111, (req, res) => {
    console.log("Node Js Application Started...");
})
app.get("/Sravs", (req,res) => {
    res.send("Hi I am Shravani from Wipro...");
})
app.get("/show/:name", (req, res) => {
    const name = req.params.name;
    res.send("Hi Welcome to " +name);
})