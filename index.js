const http = require('http');
const fs = require('fs');


http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  switch(path) {
    case "/":
      fs.readFile('index.html', (err, data) =>{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
      });
      break;
    case "/about":
      fs.readFile('about.html', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
      });
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
