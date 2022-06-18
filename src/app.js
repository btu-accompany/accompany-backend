const express = require("express");
const app = express();
require("dotenv/config");
const mongoose = require('mongoose');
const socket = require('socket.io');

const nearMissRoute = require("./routes/nearmiss")
const authRoute = require("./routes/auth");
const contactsRoute = require("./routes/contacts");
const newsRoute = require('./routes/news');
const SuggestionsRoute = require('./routes/suggestions')
const NotificationRoute = require('./routes/notifications')


const NearMissModel = require("./models/NearMiss");
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/uploads', express.static("uploads"));
app.use("/nearmiss", nearMissRoute);
app.use("/auth", authRoute);
app.use("/contacts", contactsRoute);
app.use('/news', newsRoute);
app.use('/suggestions', SuggestionsRoute);
app.use('/notifications', NotificationRoute);


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

const server = app.listen(port, () => {
    console.log(port + ". portta çalışıyor");
});

const io = socket(server);


io.on('connection', (socket) => {
    console.log('A user connected ' + socket.id);

    socket.on("msg", (arg) => {
        console.log(arg); // world
    });

    NearMissModel.watch().on("change", (change) => {
        const dataString = JSON.stringify(change);
        const dataObject = JSON.parse(dataString)

        if (dataObject.operationType == "insert") {
            socket.emit("added-nearmiss", dataObject.fullDocument);
        }
    });
});