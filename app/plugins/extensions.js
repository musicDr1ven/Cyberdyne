var path = require('path'),
    fs = require('fs'),
    flatiron = require('flatiron'),
    common = flatiron.common,
    existsSync = fs.existsSync || path.existsSync

exports.name = 'extensions';

exports.attach = function (options) {
  var app = this
  options = options || {}

  //
  // Accept string `options`.
  //
  if (typeof options === 'string')
    options = { root: options }

  app.extensions = app.extensions || {}

  //
  // Load the controllers directory based on a few intelligent defaults:
  //
  // * `options.dir`: Explicit path to controllers directory
  // * `options.root`: Relative root to the controllers directory ('/app/controllers')
  // * `app.root`: Relative root to the controllers directory ('/app/controllers')
  //
  if (options.dir || options.root || app.root) {
    app._extensionsDir = options.dir
      || path.join(options.root || app.root, 'app', 'extensions')

    try {
      existsSync(app._extensionsDir)
    }
    catch (err) {
      console.error('invalid controller path: ' + app._extensionsDir)
      return
    }
console.log('prefoleder');
console.log(app._extensionsDir);
    var dirs = common.tryReaddirSync(app._extensionsDir);


console.log(dirs);
        dirs.forEach(function(folder){
            console.log(app._extensionsDir + '/' + folder);
            var files = common.tryReaddirSync(app._extensionsDir + '/' + folder);
            if (files.length === 0)
            console.warn('no index found at extension: ' + app._extensionsDir + '/' + folder);
             files.forEach(function (file) {
                  file = file.replace('.js', '');
                  
                  if (file=="index"){
                      console.log('got' + folder);
                     var extension = folder;
                      delete app.extensions[common.capitalize(folder)]
                      app.extensions[folder] = require(
                        path.resolve(app._extensionsDir + '/' + folder, file)
                      );
                      app.extensions[folder].init(app._extensionsDir);
                      console.log("added extension " + folder)
                  }
            });
   
            
        });
        
        
   



    

    

    
  }
}

function getSubDirs(dir, next) {
   fs.readdir(dir, function(err, files) {
        var dirs = [],
        filePath,
        checkDirectory = function(err, stat) {
            if(stat.isDirectory()) {
                dirs.push(files[i]);
            }
            if(i + 1 === l) { // last record
            console.log("sending" + dirs);
                next(dirs);
            }
        };

        for(var i=0, l=files.length; i<l; i++) {
            if(files[i][0] !== '.') { // ignore hidden
                filePath = dir+'/'+files[i];
                fs.stat(filePath, checkDirectory);
            }
        }
    });
    
}

exports.init = function (done) {
  var app = this
    , options

  //
  // Attempt to merge defaults passed to `app.use(flatiron.plugins.controllers)`
  // with any additional configuration that may have been loaded.
  //
  options = common.mixin(
      {}
    , app.options['extensions']
    , app.config.get('extensions') || {}
  )

  app.config.set('extensions', options)

  done()
}
