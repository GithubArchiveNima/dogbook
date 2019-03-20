
const express = require("express"),
app = express(),
bodyParser = require('body-parser'),
errorHandler = require('errorhandler'),
methodOverride = require('method-override'),
hostname = process.env.HOSTNAME || 'localhost',
port = parseInt(process.env.PORT, 10) || 5000,
publicDir = process.argv[2] || __dirname + '/public',
path = require('path');

/*
Define the routes below
*/

// attach middleware
app.use(methodOverride());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(express.static(publicDir));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

const dogs = [
  {
    name: 'Otis',
    breed: 'Frenchie',
    size: 'teeny'
  },
  {
    name: 'Frida',
    breed: 'Golden Lab',
    size: '*nods head* medium chonk'
  },
  {
    name: 'Sir Dogsworth',
    breed: 'Chihuahua/Sheepdog mix',
    size: 'Confusing'
  }
]



// home page
app.get("/", function (req, res) {
  res.sendFile(path.join(publicDir, "/index.html"));
});

app.get('/dogs', (req, res) => {
  res.json({
    dogs: dogs
  })
})

app.post('/dogs', (req, res) => {
  // something happens here....
  console.log(req.body)
  const newDog = {
    name: req.body.name,
    breed: req.body.breed,
    size: req.body.size
  }

  dogs.push(newDog)
  
  res.json({
    message: 'CREATED DOG',
    data: newDog
  })
})

// start the server
app.listen(port, hostname, function(){
console.log("Serving %s listening at http://%s:%s", publicDir, hostname, port);
});
