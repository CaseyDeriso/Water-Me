/*
 * Auto-generated content from the Brackets New Project extension.  Enjoy!
 */


let PlantsController = (function() {
    
    var Plant = function(id, name, amountWater, frequencyWater) {
            this.id= id;
            this.name= name;
            this.amountWater= amountWater;
            this.frequencyWater= frequencyWater;
        };

        Plant.prototype.wateringTime = function() {
           
            // create resetable timer to run waterMe() on plant that needs to be watered. 
            waterMe(7,0)

        }

        function waterMe(frequencyWater, ID) {

            // perform dom manipulation to reset watering indicator
            console.log(`%{ID} has been watered!`)
        }
    var data = {
        plants: [],
    }
    
    return {
        addPlant: function (name, amtWat, freqWat) {
            var newItem, ID;
            
            if (data.plants.length > 0) {
                ID = data.plants[data.plants.length -1].id + 1;
            } else {
                ID = 0;
            }
            newItem = new Plant(ID, name, amtWat, freqWat);
            
            data.plants.push(newItem);
            
            return newItem
        },
        
    testing: function() {
            console.log(data);
        },
        
        
    };
    
    
    
})();


var UIcontroller = (function() {
    
    var DOMstrings = {
        inputName: '.name',
        inputAmount: '.name',
        inputFrequency: '.name',
        
    }
    
    return {
        displayMonth: function() {
            var now, year, months, month;
            
            now = new Date();
            
            months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            
            month = now.getMonth();
            
            year = now.getFullYear();
            
            day = now.getDate();
            
            date = day + ' ' + months[month] + ' ' + year;
            
            monthyear = months[month] + ' ' + year;
            
            document.querySelector(/* DOM STRING FOR DATE*/).textContent = monthyear;
            
            return date;
            
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        },
    };
})


















