var flatiron = require('flatiron');
var Chance = require('chance');


exports.name = 'chance';

exports.newChance = function () {
    
    var chance = new Chance();
    return chance;
    
}