
            var path = require('path'),
            fs = require('fs'),
            flatiron = require('flatiron'),
            common = flatiron.common,
            existsSync = fs.existsSync || path.existsSync
            
            exports.name = 'Cerebrum';
            
            exports.Frontal = function()
            {
                
                this.thePlanner = {};
                this.theDecider = {};
                this.theExecutor = {};
                
                
                this.BrocasArea = require('./brocas.js');
                //speech and stuff
                
                
            }
            
            exports.Occipital = function()
            {

            }
            //visual Processing
            
            exports.Temporal = function()
            {
                this.WernicksArea = function()
                {
                    
                    
                    
                }
            //processing language
            
            }
            
            exports.Parietal = function()
            {
                this.homonculus = function()
                {
                    
                    
                }
            
            }