var path = require('path'),
    fs = require('fs'),
    flatiron = require('flatiron'),
    common = flatiron.common,
    existsSync = fs.existsSync || path.existsSync

var Plates = require('plates');
var postal = require('postal');
exports.name = 'postal';


var extensionsDir = "";

var channels = {};



exports.init = function (extensionsDir) {
  var app = this

    app.postal = app.postal || {}
    extensionsDir = extensionsDir;
    
    console.log("postal input:" + extensionsDir);
    
                    
  //  delete app.postal["subscribeToChannel"];
   // app.postal["subscribeToChannel"] = subscribeToChannel;
   //  app.postal["publishToChannel"] = publishToChannel;                
  }


   
  exports.subscribeToChannel = function(channelName, fn)
  {
      var channel = postal.channel();

    // subscribe to 'name.change' topics
    var subscription = channel.subscribe( channelName, function ( data ) {
       fn;
    });
      
  }
  
  exports.publishToChannel = function(channelName, msg)
  {
      var channel = postal.channel();
      
      channel.publish( channelName, msg );
      
  }


