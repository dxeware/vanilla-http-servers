var http = require('http');
var fs = require('fs');
var util = require('util');

var server = http.createServer(function (req, res) {
  var writeStr = '';

  if (req.url === '/time') {
    var time = new Date().getTime();

    writeStr = Math.floor(time/1000).toString();

  } else {
    //console.log(req);

    var match = req.url.match(/^\/greet\/(.+)/);

    if (match !== null) {
      if (req.method === 'GET') {
        writeStr = 'How are you, ' + match[1] + '?';
      } else if (req.method === 'POST') {
        console.log('received a POST');
        var body = '';
        req.on('data', function (chunk) {
          body += chunk.toString();
        });
        req.on('end', function() {
          var greetName = JSON.parse(body);
          //console.log(greetName.name);
          writeStr = 'How are you, ' + greetName.name + '?';
          res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write(writeStr);
    res.end(); //stops browser from waiting for response
        });
      }
    }
  }

  // Send reponse if string is NOT empty
  if (writeStr !== '') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write(writeStr);
    res.end(); //stops browser from waiting for response
  }

});

server.listen(3000, function () {
  console.log('listening on port 3000...');
});
