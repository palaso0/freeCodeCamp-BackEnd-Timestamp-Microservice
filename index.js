// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/", function (req, res) {
  res.json({ 'unix': Date.now(), 'utc': Date() });
});

app.get("/api/:date?", (req, res) => {
  let date = req.params.date;

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  if (isValidDate(new Date(date))) {
    let date_string = new Date(date)
    res.send({
      unix: date_string.getTime(),
      utc: date_string.toUTCString()
    });
  } else if (isValidDate(new Date(+date))) {
    let date_string = new Date(+date)
    res.send({
      unix: date_string.getTime(),
      utc: date_string.toUTCString()
    });
  }else{
    res.send({
      error: "Invalid Date"
    });
  }

  let date_string = new Date()
  if (date.includes("-")) {
    date_string = new Date(date)
  } else {
    date_string = new Date(+date)
  }


  if (isValidDate(date_string)) {
    res.send({
      unix: date_string.getTime(),
      utc: date_string.toUTCString()
    });
  } else {
    res.send({
      error: "Invalid Date"
    });
  }

})

// listen for requests :)
var listener = app.listen(3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

