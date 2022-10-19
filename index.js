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

app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  let dateTime = new Date()
  if (date.includes("-")) {
    dateTime = new Date(date)
  } else {
    dateTime = new Date(+date)
  }
  let dateArray = dateTime.toString().split(" ")
  let day = dateArray[0]
  let month = dateArray[1]
  let dayDate = dateArray[2]
  let year = dateArray[3]
  let hour = dateArray[4]
  const GMT = "GMT"
  res.json({
    unix: dateTime.getTime(),
    utc: `${day}, ${dayDate} ${month} ${year} ${hour} ${GMT}`
  });

})

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
