const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const sonics79 = require('./data');
const qs = require('querystring');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");

app.get('/', (req, res) => {
  players = sonics79.getAll()
  allPlayers = [];
  players.forEach(element => {
    allPlayers.push(element.player)
  });
  res.render('index', {all: allPlayers}) 
 });

 app.get('/about', (req, res) => {
  res.type('text/html');
  res.sendFile(__dirname + '/about.html');
 });

 app.get('/delete', (req, res) => {
  const url = req.url.split('?');
  const queryParams = qs.parse(url[1]);
  const player = sonics79.deletePlayer(queryParams.name)
  res.render('delete', {player: queryParams.name, deleted: player}) 
 });

 app.post('/detail', (req, res) => {
    let player = sonics79.get(req.body.user);
    let nm = (player) ? JSON.stringify(player)  : 'Not Found';
    if (nm == 'Not Found'){
      var notFound = 'Not Found'
      res.render('detail', {name: req.body.user, result: player, player: notFound});
    } else {
      var notFound = 'Found'
      res.render('detail', {name: req.body.user, result: player, player: notFound});
    }
 });

app.use( (req,res) => {
  res.type('text/html'); 
  res.status(404);
  res.sendFile(__dirname + '/error.html');
 });

 app.listen(app.get('port'), () => {
  console.log('Monkies are smart'); 
 });