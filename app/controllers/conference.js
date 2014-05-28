var flatiron = require('flatiron')
  , app = flatiron.app,
  fs = require('fs');
var Plates = require('plates');


var getConference = function () {
  var req = this.req
    , res = this.res
  res.writeHead(200, { 'content-type': 'text/html' });
  
 // var template = fs.readFileSync(__dirname.replace('controllers','views/index.html'), "utf-8");
//var partial = fs.readFileSync(__dirname.replace('controllers','views/partials/frontpage.html', "utf-8"));

// Render the partial into main.
// The data-key in the second param is matched to the id in the template.
// Plates renders the corresponding value - in this case the contents of
// partial.html - between the start and end tags with this id.

var html = fs.readFileSync(__dirname.replace('controllers','views/public/index.html'), "utf-8");
var partial = fs.readFileSync(__dirname.replace('controllers','views/partials/desktop.html'), "utf-8");
var data = { "mainContent": partial };

var output = Plates.bind(html, data); 




  res.html(output);
}

module.exports.init = function () {
  app.router.get('/conference', getConference);
  
}
