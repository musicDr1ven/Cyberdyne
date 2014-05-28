var flatiron = require('flatiron')
  , app = flatiron.app,
  fs = require('fs');
var Plates = require('plates');




var demo = function () {
  var req = this.req
    , res = this.res
  res.writeHead(200, { 'content-type': 'text/html' });


var html = fs.readFileSync(__dirname.replace('controllers','views/public/frontpage_template_demo.html'), "utf-8");
var partial = fs.readFileSync(__dirname.replace('controllers','views/partials/frontpage.html'), "utf-8");
var data = { "mainContent": partial };

var output = Plates.bind(html, data); 




  res.html(output);
}

module.exports.init = function () {
  app.router.get('/frontpagedemo', demo);
  
}