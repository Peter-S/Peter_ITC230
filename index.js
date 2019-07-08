const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const sonics79 = require('./data');

http.createServer((req,res) => {
  const url = req.url.split('?');
  const queryParams = qs.parse(url[1]);
  const path = url[0].toLowerCase();
  
  switch(path) {
    case '/':
      fs.readFile('index.html', (err, data) =>{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
      });
      break;
    case '/about':
      fs.readFile('about.html', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
      });
      break;

    case '/getall':
      let team = sonics79.getAll();
      let message = JSON.stringify(team)
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(message);
      break;

    case '/detail':
      let player = sonics79.get(queryParams.player);
      let nm = (player) ? JSON.stringify(player) : 'Not Found'
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('Results for ' + queryParams.player + '\n' + nm);
      break;

    case '/delete':
      let dplayer = sonics79.deletePlayer(queryParams.player)
      let dnm = (dplayer) ? JSON.stringify(dplayer) : 'Not Found'
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('Results for ' + queryParams.player + '\n' + dnm);
      break;
    
    default:
      fs.readFile('error.html', (err, data) => {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
        });
        break;
    };
}).listen(process.env.PORT || 3000);