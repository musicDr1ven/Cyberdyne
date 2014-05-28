var flatiron = require('flatiron')
  , app = flatiron.app,
  fs = require('fs');
var Plates = require('plates');

function menuDef(Title, Href, IconClass, Children)
{
    this.title = Title;
    this.href = Href;
    this.iconClass = IconClass;
    this.children = Children;
    
}


var childserverstatus = false;


module.exports.init = function () {
     console.log("here is testme from child server init :" +  app.cmd.testMe());
     
     app.router.path('/server/start', function () {

          // This is the same functionality as previously.
          this.get(function () {
            app.cmd.startChildSystem();
 

             var msg = {msg: "Server Started."};
    childserverstatus=true;
            this.res.json(200, msg);
          });
        
         
    });
    app.router.path('/server/end', function () {

          // This is the same functionality as previously.
          this.get(function () {
            app.cmd.endChildSystem();
   
childserverstatus = false;
                var msg = {msg: "Server Ended."};

                this.res.json(200, msg);
          });
        
         
    });
    app.router.path('/server/status', function () {

          // This is the same functionality as previously.
          this.get(function () {
            var status = app.cmd.getServerStatus;
                var statusJson = {"server": childserverstatus};
                this.res.json(200, statusJson);
          });
        
         
    });
    
}
