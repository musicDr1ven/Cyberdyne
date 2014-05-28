var flatiron = require('flatiron');


exports.name = 'systemUtil';

exports.getRandomFreeServerPort = function () {
    
    var port = 0;
    var http = require('http');
var server = http.createServer();
server.listen(0,IPv4);
server.on('listening', function() {
    console.log('Server is running on: ' + server.address().port);
    port = server.address().port;
    server.close();
    return port;
})

}

var IPv4 = (function(){
  var interfaces = require('os').networkInterfaces(),
  IP;
  for (var iface in interfaces) {
      interfaces[iface].forEach(function(addr) {
          if (addr.family == 'IPv4') {
              IP = addr.address;
          }
     });
  }
  return IP;
}());


