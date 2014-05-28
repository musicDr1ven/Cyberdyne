var smoke = require('./helpers/index')

process.stdin.setEncoding('utf8');

var flatiron = require('flatiron');
var node = {};
exports.name = 'skyNetServer';

exports.connectToPeers = function (knownSeeds, done) {
    
     node = smoke.createNode({
      port: parseInt(process.argv[2]) || 14
    , address: smoke.localIp('192.168.2.1/255.255.255.0')
    , seeds: [knownSeeds] 
    })
    //{port: 7777, address:'localhost'},{port: 8000, address:'localhost'}
    console.log('Port', node.options.port)
    console.log('IP', node.options.address)
    console.log('ID', node.id)
    
    console.log('Connecting...');
    
    node.on('connect', function() {
      console.log('Connected. !\n');
    })
    
    node.on('disconnect', function() {
      console.log('Disconnected. Sorry.');
    })
    
    node.on('add', function(peer) {
      console.log(peer.id + ' Joined');
    })
    
     node.on('remove', function(peer) {
      console.log(peer.id + ' Left');
    })
    
    // Send message
    process.stdin.pipe(node.broadcast).pipe(process.stdout)
    
    node.on('error', function(e) {throw e})
    node.start();
}
