var express = require("express");
var app = express();
const url = require("url");

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const formatResponse = (dateObject) => {
  return {
    unix: dateObject.getTime(),
    utc: dateObject.toUTCString(),
  };
};

app.get(/^\/api\/.*$/, (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const parts = pathname.split("/");
  const date = parts[2];

  if (date === "") {
    return res.send(formatResponse(new Date()));
  }

  if (Date.parse(date)) {
    return res.send(formatResponse(new Date(date)));
  }

  if (parseInt(date)) {
    const dateObject = new Date(parseInt(date));
    return res.send(formatResponse(dateObject));
  }

  res.send({ error: "Invalid Date" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
