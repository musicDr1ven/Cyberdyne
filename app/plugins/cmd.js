var path = require('path'),
    fs = require('fs'),
    flatiron = require('flatiron'),
    common = flatiron.common,
    existsSync = fs.existsSync || path.existsSync

var childProcess = require('child_process');
var postal = require('../extensions/postal/index.js');

exports.name = 'cmd';
require('shelljs/global');
var editor = {};
var rootDir = "";
var childsystem = {};
var serverStatus = false;
var editorStatus = false;
exports.attach = function (options) {
  var app = this
  options = options || {}

  //
  // Accept string `options`.
  //
  if (typeof options === 'string')
    options = { root: options }

  app.cmd = app.cmd || {}


  if (options.dir || options.root || app.root) {
    app._cmdDir = options.dir
      || path.join(options.root || app.root, 'app', 'controllers')

    try {
      existsSync(app._cmdDir);
     
    }
    catch (err) {
      console.error('invalid cmd path: ' + app._cmdDir)
      return
    }

    rootDir = app._cmdDir;
    
      app.cmd["testMe"] = testMe;
      app.cmd["getServerStatus"] = getServerStatus;
      app.cmd["openEditor"] = openEditor;
      
     
      app.cmd["closeEditor"] = killEditor;
      app.cmd["killEditor"] = killEditor;
    
      app.cmd["startChildSystem"] = startChildSystem;
  
  
      app.cmd["endChildSystem"] = endChildSystem;
    // console.log("cmd connected: " + app.cmd.startChildSystem.toString());
      console.log("here is testme :" +  app.cmd.testMe());
  }
}

function testMe()
{
    
    
    return "you got test me";
}
function getServerStatus()
{
    return serverStatus;
    
    
}
function startChildSystem()
{
     var dir = __dirname;
    dir = dir.replace('/app/plugins', '');
  cd(dir);

 childsystem = childProcess.fork('app.js', function (error, stdout, stderr) {
   if (error) {
     console.log(error.stack);
     console.log('Error code: '+error.code);
     console.log('Signal received: '+error.signal);
   }
   console.log('Child Process STDOUT: '+stdout);
   console.log('Child Process STDERR: '+stderr);
   postal.publishToChannel("subapp.out", stdout);
   
 });

 childsystem.on('exit', function (code) {
   console.log('Child process exited with exit code '+code);
 });
    childsystem.on("SIGTERM", function () {
    childProcess.emit("SIGTERM");
  });
   

}
function endChildSystem()
{
   
  childsystem.kill("SIGTERM");
  childsystem.kill("SIGINT");
  
  



// And the exit event shuts down the child.

 
 
// This is a somewhat ugly approach, but it has the advantage of working
// in conjunction with most of what third parties might choose to do with
// uncaughtException listeners, while preserving whatever the exception is.

  // If this was the last of the listeners, then shut down the child and rethrow.
  // Our assumption here is that any other code listening for an uncaught
  // exception is going to do the sensible thing and call process.exit().
 

   
    serverStatus = false;
}
function openEditor()
{
      //node server.js "$@" -a x-www-browser
     var dir = __dirname;
    dir = dir.replace('/app/plugins', '/cloud9/bin/')
  cd(dir);
    //path.join(options.root || app.root, 'app', 'controllers')
//console.log(dir + '/bin/cloud9.sh');
console.log(ls());
 var editor = exec('./cloud9.sh -w ../', {async:true});
editor.stdout.on('data', function(data) {
  console.log(data);
});

   


}

 function killEditor()
{
    
     editor.kill("SIGTERM");
  editor.kill("SIGINT");
  editorStatus = false;
    
}

function getStatusOfEditor()
{
    
    return editorStatus;
  
    
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
    , app.options['cmd']
    , app.config.get('cmd') || {}
  )

  app.config.set('cmd', options)
console.log('cmd inited');
  done()
}
