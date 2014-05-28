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


var indexGet = function () {
  var req = this.req
    , res = this.res
  res.writeHead(200, { 'content-type': 'text/html' });


var html = fs.readFileSync(__dirname.replace('mgrControllers','views/admin/index.html'), "utf-8");

var mnu1 = new menuDef("Server", "assets/views/admin/server.html", "fa fa-desktop", "");
var mnu2 = new menuDef("Site Editor", "assets/views/admin/siteEditor.html", "fa fa-pencil-square-o", "");
var fullmenu = [mnu1,mnu2];
var menu = app.extensions.adminSidebar.getMenu(fullmenu);
var data = { "adminSidebar": menu };

var output = Plates.bind(html, data); 




  res.html(output);
}

module.exports.init = function () {
   
  app.router.get('/', indexGet);
  
}
