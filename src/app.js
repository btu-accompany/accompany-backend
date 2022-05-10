const express = require("express");
const app = express();
require("dotenv/config");
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Ana Sayfa");
});


//Connect DB 
mongoose.connect(
    process.env.DB_CONNECTION,
    () => {
        console.log("Connected To Db");
    }
);

app.listen(port, () => {
    console.log(port + ". portta çalışıyor");
});