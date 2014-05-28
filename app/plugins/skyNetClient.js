var smoke = require('./helpers/index')

process.stdin.setEncoding('utf8');

var flatiron = require('flatiron');
var node = {};
exports.name = 'skyNetClient';


exports.broadcast = function(msgOut)
{
    node.broadcast.write(msgOut);
    msgOut = "";
    
    
}
exports.connectToPeers = function (knownSeeds, done) {
    node = smoke.createNode({
      port: parseInt(process.argv[2]) || 14
    , address: smoke.localIp('192.168.2.1/255.255.255.0')
    , seeds: [knownSeeds] //<-- You may need to change this address!
    })
    //{port: 26000, address:'localhost'}
    console.log('Port', node.options.port)
    console.log('IP', node.options.address)
    console.log('ID', node.id)
    
    console.log('Connecting...');
    
    node.on('connect', function() {
      console.log('Connected. Happy chatting!\n');
    })
    
    node.on('disconnect', function() {
      console.log('Disconnected. Sorry.');
    })
    
    node.on('add', function() {
      console.log('Peer Added');
    })
    
    
    // Send message
    process.stdin.pipe(node.broadcast).pipe(process.stdout)
    
    node.on('error', function(e) {throw e})
    node.start();
}

