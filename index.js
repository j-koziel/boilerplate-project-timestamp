// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const rightNow = () => {
  return new Date().toUTCString();
};

const utcDateString = (date) => {
  return new Date(date).toUTCString();
};

app.get("/api/:date?", (req, res, next) => {
  const dateParam = Number(req.params.date)
    ? Number(req.params.date)
    : req.params.date;
  console.log(dateParam);
  console.log(req.params.date);

  console.log(utcDateString(dateParam));
  if (!dateParam) {
    res.status(200).json({ unix: Date.now(), utc: rightNow() });
  }

  if (new Date(dateParam).getTime() > 0) {
    res.status(200).json({
      unix: new Date(dateParam).getTime(),
      utc: utcDateString(dateParam),
    });
  } else {
    res.status(500).json({
      error: "Invalid Date",
    });
  }

  next();
});

// listen for requests :)
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
