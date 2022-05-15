const express = require("express");
const app = express();
require("dotenv/config");
const mongoose = require('mongoose');
const nearMissRoute = require("./routes/nearmiss")
const path = require("path");
const postsRoute = require("./routes/register");
const contactsRoute = require("./routes/contacts");
const newsRoute = require('./routes/news');
const SuggestionsRoute=require('./routes/suggestions')

const port = process.env.PORT || 3000;


app.use('/uploads', express.static("uploads"));
app.use(express.json());
app.use("/nearmiss", nearMissRoute);
app.use("/register", postsRoute);
app.use("/contacts", contactsRoute);
app.use('/news', newsRoute);
app.use('/suggestions', SuggestionsRoute);


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