var path = require('path'),
    fs = require('fs'),
    flatiron = require('flatiron'),
    common = flatiron.common,
    existsSync = fs.existsSync || path.existsSync

var Plates = require('plates');

exports.name = 'adminSidebar';


var extensionsDir = "";

var menu = {};

var menuDef = {title:"", href:"",iconClass:"", children:{}}

exports.getMenu = function(fullMenu)
{
    var alllinks="";
    
    if (!(typeof fullMenu === "undefined")){
        fullMenu.forEach(function (menu) {
           // console.log(menu.children);
           if (menu.children == "")
           {
              // console.log("got to single");
             var item = getSingleNav(menu.title, menu.href, menu.iconClass);
              alllinks += item;
             //  console.log(alllinks);
           }else{
               
              
            var item = getMultiNav(menu.title, menu.href, menu.iconClass, menu.children);
             alllinks += item;
               
           }
        });
    } else {
        var dashboard = getSingleNav("Dashboard","assets/devoops/ajax/dashboard.html", "fa fa-dashboard");
        var siteEditor = getSingleNav("Site Editor","assets/views/admin/siteEditor.html", "fa fa-dashboard");
        
        var chartpages = [{href:"assets/devoops/ajax/charts_xcharts.html", title:"xCharts"},
        {href:"assets/devoops/ajax/charts_flot.html", title:"Flot Charts"}]
        
        var chartmenu = getMultiNav("Charts","#","fa fa-bar-chart-o",chartpages);
        
         alllinks = dashboard + siteEditor + chartmenu;
    }
    var htmloutput = getMenuHTML(alllinks);
    
    return htmloutput;
    
    
}

exports.init = function (extensionsDir) {
  var app = this


  

 // app.ui = app.ui || {}


 
    extensionsDir = extensionsDir;
 
//menu.push({name:});
  
  }
function getLinkItem(title, href)
{
    var singleNav =  fs.readFileSync(__dirname + '/views/linkitem.html', "utf-8");
    
    var data = { "navhref": href,"title": title};
    
     
    var map = Plates.Map();

    map.where('class').is('ajax-link').use('navhref').as('href');
   
    map.class('ajax-link').to('title');
    
    var output = Plates.bind(singleNav, data, map);
    
    return output;
}
function getSingleNav(title, href, imgclass)
{
    var singleNav =  fs.readFileSync(__dirname + '/views/singleNav.html', "utf-8");
    
    var data = { "navhref": href,"imgclass": imgclass ,"title": title};
    
     
    var map = Plates.Map();

    map.where('class').is('ajax-link').use('navhref').as('href');
     map.where('data-name').is('icon').use('imgclass').as('class');
    map.class('hidden-xs').to('title');
    
    var output = Plates.bind(singleNav, data, map);
    
    return output;
}
function getMultiNav(title, href, imgclass, sublinks)
{
    var sublinkhtml = "";
   
    
     sublinks.forEach(function (page) {
          sublinkhtml+= getLinkItem(page.title, page.href);
         
     });
    
    var multiVav =  fs.readFileSync(__dirname + '/views/multiNav.html', "utf-8");
    
    var data = { "navhref": href,"imgclass": imgclass ,"title": title, "children": sublinkhtml};
    
     
    var map = Plates.Map();

    map.where('class').is('active ajax-link').use('navhref').as('href');
     map.where('data-name').is('icon').use('imgclass').as('class');
    map.class('hidden-xs').to('title');
     map.class('dropdown-menu').to('children');
     
    var output = Plates.bind(multiVav, data, map);
    
    return output;
}
function getMenuHTML(dashboardItems)
{
     var html = fs.readFileSync(__dirname + '/views/index.html', "utf-8");
    
    var outerdata={"menuitems": dashboardItems};
    var outermap = Plates.Map();
     outermap.class('nav main-menu').to('menuitems');
    
     var htmloutput = Plates.bind(html, outerdata, outermap);
    return htmloutput;
}

   
  


