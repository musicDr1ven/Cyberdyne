var path = require('path'),
    fs = require('fs'),
    flatiron = require('flatiron'),
    common = flatiron.common,
    existsSync = fs.existsSync || path.existsSync

var Plates = require('plates');
var postal = require('postal');

exports.name = 'Andromeda';


var cerebrum = require('./modules/Cerebrum.js');
var cerebellum = require('./modules/Cerebellum.js');





exports.init = function (extensionsDir) {
  var app = this

    app.postal = app.postal || {}
    extensionsDir = extensionsDir;
    
                
  }


   
  exports.brain = function()
  {
        this.Cerebrum = cerebrum;
        
        this.Cerebellum = cerebellum;
       
      
      
      
      
  }
  



