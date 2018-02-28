var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.get('/', (req,res) => res.sendFile('public/neemay-Quiz1.html', {root: __dirname}));

app.post('/zipcode', function(req, res) {
  var zipcode = req.body.zipcode;
  console.log(zipcode);
  var appid = 'ed385aaf7b99c0461f00dfc1ef01ce11';
  var api = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + '&units=Metric&appid=' + appid;
  
  request(api, function(error, response, body) {
    jsonObj = JSON.parse(body);
    var temp = jsonObj.main.temp;
    var location = jsonObj.name;
    console.log(temp);
    var output = '<p>Current weather in ' + location + ': ';
    if(temp <= 0) {
      output += "<span style='color: darkblue;'>It's freezing!</span>";
    }
    else if(temp <=10) {
      output += "<span style='color: blue;'>It's cold!</span>";
    }
    else if(temp <= 25) {
      output += "<span style='color: green;'>It's warm!</span>";
    }
    else {
      output += "<span style='color: red;'>It's hot!</span>";
    }
    output += "</p><a class='btn btn-primary' href='http://localhost:3000'>Refresh</a><form action='/zipcode' method='post'><label for='zipcode'>Enter new zipcode:</label><input type='number' name='zipcode' class='form-control'/><input type='submit' value='Run' class='btn btn-primary'/></form>";
    
    res.send(output);
  });
  
});

app.listen(3000, () => console.log('Server listening on port 3000'));