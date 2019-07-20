const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const sonics79 = require('./data');
const qs = require('querystring');
const sonics = require('./models/sonics')

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");


app.get('/', (req, res) => {
  sonics.find({}, (err, items) => {
    if(err) return next (err);
  res.render('index', {all: items}) 
 })
})

app.get('/about', (req, res) => {
  res.type('text/html');
  res.sendFile(__dirname + '/about.html');
});

 app.get('/delete', (req, res) => {
    const url = req.url.split('?')
    const queryParams = qs.parse(url[1])
    sonics.deleteOne({player: (queryParams.name)}, (err) => {
      if(err) console.log(err)
      
  })
    sonics.find({}, (err, items) => {
      if(err) return next (err);
      res.render('delete', {name: queryParams.name, all: items}) 
  })
 });

 app.post('/detail', (req, res) => {
    sonics.find({'player':(req.body.user)}, (err, items) => {
      if (err) return next(err);
      let sonic = req.body.user
      res.render('detail', {name: items, result: sonic})
    });   
 });

 app.post('/', (req, res) => {
  let newPlayer = {'player': (req.body.name), 'position': (req.body.position), 'number': (req.body.number) }
  sonics.updateOne({'player':'Pete Soukup'}, newPlayer, {upsert:true}, (err, result) => {
    if (err) return next(err);
  res.render('added', {player: newPlayer})
 })
})

app.use( (req,res) => {
  res.type('text/html'); 
  res.status(404);
  res.sendFile(__dirname + '/error.html');
 });

 app.listen(app.get('port'), () => {
  console.log('Monkeys are smart'); 
 });