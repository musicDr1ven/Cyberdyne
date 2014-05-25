var smoke = require('./index')

var node = smoke.createNode({
  port: parseInt(process.argv[2]) || 14
, address: smoke.localIp('10.0.2.15/255.255.255.0')
, seeds: [{port: 14, address:'localhost'}]
})


console.log('Connecting...');

node.on('connect', function() {
  console.log('Connected. Happy flooding!\n');
  for(var i=0; i<10000; i++) setTimeout(function(i) { node.broadcast.write('flo�od!'+i) }.bind(this, i), 30*i)
})

node.on('disconnected', function() {
  console.log('Disconnected. Sorry.');
})

node.start()