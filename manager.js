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



var extensions = require('./app/plugins/extensions.js');
var cmd = require('./app/plugins/cmd.js');
var app2 = {};


var app1 = new startApp(26002, app,'./app/plugins/mgrControllers.js', function()
{
   
    
});


function startApp(portnum, application, controllerfile, fn) {
    
    
  var controllers = require(controllerfile)
    // Configuration file
    application.config.defaults({
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
    application.use(flatiron.plugins.http, {
        
      
      headers: {
        'x-powered-by': 'flatiron-' + flatiron.version
      }
    })
    
    
    application.use(flatiron.plugins.static, {dir: './app/public', url: '/assets'});
    
    application.router.get('/headers', function () {
      this.res.json(this.req.headers);
    });
    
    // Use resourceful plugin, automatically loads resources
    //app.use(flatiron.plugins.resourceful, {})
    
    // Use plates plugin to support layouts and views
    application.use(views, { root: __dirname })
    
    application.use(extensions, { root: __dirname })
    
    // Use controllers plugin to set up routes
    application.use(controllers, { root: __dirname })
    
    application.use(cmd, { root: __dirname })
    // Use RESTful Director
    application.use(restful, app.config.get('restful') || {})
    
    // Start application
    application.start(app.config.get('port') || 26002, function (err) {
      if (err) {
        application.log.err(err)
        console.trace()
    	process.exit(1)
      }
      var addr = app.server.address()
      application.log.info('Server started on http://' + addr.address + ':' + addr.port + ' in ' + env);
     
      fn;
    })
}

