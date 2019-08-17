const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const sonics = require('./models/sonics')

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'))
// app.use(bodyParser.urlencoded({extended: true}))
app.use(require("body-parser").urlencoded({extended: true}));
app.use(require('body-parser').json())
app.use('/api', require('cors')())
app.use((err, req, res, next) => {
  console.log(err)
})

let handlebars =  require("express-handlebars")
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");


app.get('/', (req, res) => {
  sonics.find({}, (err, sonics) => {
    if(err) return next (err);
  // res.render('index', {all: items}) 
  res.render('home', {sonics: JSON.stringify(sonics)}) 
 })
})

app.get('/about', (req, res) => {
  res.type('text/html');
  res.sendFile(__dirname + '/about.html')
});

 app.get('/delete', (req, res) => {
    sonics.deleteOne({player: (req.query.name)}, (err) => {
      if(err) console.log(err)
      
  })
    sonics.find({}, (err, items) => {
      if(err) return next (err)
      res.render('delete', {name: req.query.name, all: items}) 
  })
 });

 app.post('/detail', (req, res) => {
    sonics.find({'player':(req.body.user)}, (err, items) => {
      if (err) return next(err)
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

// api routes **************************************
// *******************************************

app.get('/api/v1/player', (req, res) => {
  sonics.findOne({
    player: req.query.player
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

app.get('/api/v1/players', (req, res, next) => {
  sonics.find({
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

app.get('/api/v1/delete', (req, res) => {
  sonics.findOneAndRemove({
    player: req.query.player
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

app.post('/api/v1/add/', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Missing the body')
  }
    let model = new sonics(req.body)
    model.save()
      .then(doc => {
        if(!doc || doc.length === 0) {
          return res.status(500).send(doc)
        } 
        res.status(201).send(doc)
      })
      .catch(err => {
        res.status(500).json(err)
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