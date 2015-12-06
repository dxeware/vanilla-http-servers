"use strict";

var http = require('http');

function sendResponse(res, status, string) {
  res.writeHead(status, {
      'Content-Type': 'text/html'
  });
  if (string !== '') {
    res.write(string);
  }
  res.end(); //stops browser from waiting for response
}

function processRoute(req, res) {
  var writeString = '';

  if (req.url === '/time') {
    // Get system time and send back in seconds
    var time = new Date().getTime();
    writeString = Math.floor(time/1000).toString();
    sendResponse(res, 200, writeString);

  } else if ( (req.url === '/greet') && (req.method === 'POST') ) {

    var body = '';
    req.on('data', function (chunk) {
      body += chunk.toString();
    });
    req.on('end', function() {
      var greetName = JSON.parse(body);
      writeString = 'How are you, ' + greetName.name + '?';
      sendResponse(res, 200, writeString);
    });

  } else {

    var match = req.url.match(/^\/greet\/(.+)/);

    if ( (match !== null) && (req.method === 'GET') ) {
        writeString = 'How are you, ' + match[1] + '?';
        sendResponse(res, 200, writeString);
    } else {
      sendResponse(res, 404, writeString);
    }
  }

}

var server = http.createServer(function (req, res) {
  var writeStr = '';
  writeStr = processRoute(req, res, sendResponse);
});

server.listen(3000, function () {
  console.log('listening on port 3000...');
});
