var flatiron = require('flatiron')
  , app = flatiron.app,
  fs = require('fs');
var Plates = require('plates');



var childserverstatus = false;


module.exports.init = function () {
     console.log("here is testme from child server init :" +  app.cmd.testMe());
     
     app.router.path('/editor/start', function () {

          // This is the same functionality as previously.
          this.get(function () {
            app.cmd.openEditor();
 

             var msg = {msg: "Server Started."};
    childserverstatus=true;
            this.res.json(200, msg);
          });
        
         
    });
    app.router.path('/editor/end', function () {

          // This is the same functionality as previously.
          this.get(function () {
            app.cmd.killEditor();
   
childserverstatus = false;
                var msg = {msg: "Server Ended."};

                this.res.json(200, msg);
          });
        
         
    });
    app.router.path('/editor/status', function () {

          // This is the same functionality as previously.
          this.get(function () {
            var status = app.cmd.getStatusOfEditor;
                var statusJson = {"server": childserverstatus};
                this.res.json(200, statusJson);
          });
        
         
    });
    
}
