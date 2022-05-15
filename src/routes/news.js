const express = require('express');
const request = require('request');
const router = express.Router();
router.get('/', (req, res) => {

    request({
        headers: {
            "content-type": "application/json",
            "authorization": process.env.NEWS_API_KEY

        },
        url: "https://api.collectapi.com/news/getNews?country=tr&tag=technology",
        json: true,
        method: "GET"


    },
        function (error, response, body) {
            if (error) {
                res.send("Hatayla Karşılaşıldı")
            }
            else {

                res.send(response.body.result)
            }
        })

});

module.exports = router;