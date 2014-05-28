var path = require('path')
  , flatiron = require('flatiron')
  , plates = require('plates')
  , restful = require('restful')
  , views = require('./app/plugins/plates.js')
  , smoke = require('./app/plugins/helpers/index.js')
  , skyNetServer = require('./app/plugins/skyNetServer')
  , app = module.exports = flatiron.app
  , env = process.env.NODE_ENV || 'development';

var flatiron2 = require('flatiron');
var childservice = app.childservice = flatiron2.app;


var webRTC = require('webrtc.io').listen(app);

var extensions = require('./app/plugins/extensions.js');
var cmd = require('./app/plugins/cmd.js');
var app2 = {};



 var portnum = 26000;

  var controllers = require('./app/plugins/controllers.js')
    // Configuration file
    app.config.defaults({
        "port": portnum
      , "restful": {
            "strict": true
          , "explore": true
          , "prefix": "api"
        }
      , "resourceful": {
            "engine": "mongodb"
          , "uri": "mongodb://localhost/vishnu"
        }
    })
    
    // Load HTTP plugin
    app.use(flatiron.plugins.http, {
        
      
      headers: {
        'x-powered-by': 'flatiron-' + flatiron.version
      }
    })
    
    
    app.use(flatiron.plugins.static, {dir: './app/public', url: '/assets'});
    
    app.router.get('/headers', function () {
      this.res.json(this.req.headers);
    });
    
    // Use resourceful plugin, automatically loads resources
    //app.use(flatiron.plugins.resourceful, {})
    
    // Use plates plugin to support layouts and views
    app.use(views, { root: __dirname })
    
    app.use(extensions, { root: __dirname })
    
    // Use controllers plugin to set up routes
    app.use(controllers, { root: __dirname })
    
    app.use(cmd, { root: __dirname })
    // Use RESTful Director
    app.use(restful, app.config.get('restful') || {})
    
    webRTC.rtc.on('chat_msg', function(data, socket) {
  var roomList = webRTC.rtc.rooms[data.room] || [];
console.log("got connection.");
    for (var i = 0; i < roomList.length; i++) {
    var socketId = roomList[i];

    if (socketId !== socket.id) {
      var soc = webRTC.rtc.getSocket(socketId);

      if (soc) {
        soc.send(JSON.stringify({
          "eventName": "receive_chat_msg",
          "data": {
            "messages": data.messages,
            "color": data.color
          }
        }), function(error) {
          if (error) {
            console.log(error);
          }
        });
      }
    }
  }
});

    // Start app
    app.start(portnum || 26000, function (err) {
      if (err) {
        app.log.err(err)
        console.trace()
    	process.exit(1)
      }
      var addr = app.server.address()
      app.log.info('Server started on http://' + addr.address + ':' + addr.port + ' in ' + env);
     
     
    })


