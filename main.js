

var PlantsController = (function() {
    
    // plant function constructor
    var Plant = function(id, name, amountWater, frequencyWater) {
            this.id= id;
            this.name= name;
            this.amountWater= amountWater;
            this.frequencyWater= frequencyWater;
        };

        Plant.prototype.wateringTime = function() {
           
            // create resetable timer to run waterMe() on plant that needs to be watered. 
            
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

            localStorage.setItem(Math.random() ,PlantsController.data);

            
            return newItem
        },
        
        deletePlant: function (id) {
            data.plants.splice(id,1);
        },

        testing: function() {
            console.log(data);
        },
        
        
    };
    
    
    
})();


var UIcontroller = (function() {
    
    var DOMstrings = {
        inputName: '.pName',
        inputAmount: '.aWater',
        inputFrequency: '.often',
        inputButton: '.add__btn',
        plantContainer: '.plant__container',
        
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
            
            // document.querySelector(/* DOM STRING FOR DATE*/).textContent = monthyear;
            
            return date;
            
        },

        getInput: function() {
            return {
            name: document.querySelector(DOMstrings.inputName).value,
            amountWater: document.querySelector(DOMstrings.inputAmount).value,
            frequencyWater: document.querySelector(DOMstrings.inputFrequency).value,
            };
        },
        addListItem: function(obj) {
            var html, newHtml, element;
            
            // Create HTML string with placeholder text
            element = DOMstrings.plantContainer;
                
            html = '<div class="plant__clearfix" id= "plant-%id%"> <button class= "water" onClick="waterMe(%frequencyWater% , %id%)"> water </button> <button class= "delete%id%" onClick= "Controller.removePlant(%id%)"> X </button> <div class="plantName"> %plantName% </div> <div class="amountWater"> %amountWater% Cups </div> <img src="https://picsum.photos/100/50"> </div>'
            
            
            // Replace placeholder text with data from object
            
            newHtml = html.replaceAll('%id%', obj.id);
            newHtml = newHtml.replace('%plantName%', obj.name);
            newHtml = newHtml.replace('%amountWater%', obj.amountWater);
            newHtml = newHtml.replace('%frequencyWater%', obj.frequencyWater);
            
            // Insert the HTML into the DOM
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
        },

        deleteListItem: function(ID) {
            var el = document.getElementById('plant-' + ID);
            el.parentNode.removeChild(el);
        },

        clearFields: function() {
            fields = document.querySelectorAll(DOMstrings.inputName + ',' + DOMstrings.inputAmount + ',' + DOMstrings.inputFrequency);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            fieldsArr[0].focus();
            
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        },
    };
}) ()

// GLOBAL APP CONTOLLER
var Controller = (function(PlantsController, UICtrl) {
   
    var setupEventListeners = function() {
        
        clickAdd = function() {
            addPlant();
        };

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) { //keyCode 13 is enter
                addPlant();
            }
        });
        
    };

    var addPlant = function() {
        var input, newItem
        
            // 1. Get the input data from UI field
            input = UIcontroller.getInput();
            // Check that users input is valid for our data structure
            if (input.name !== "" && !isNaN(input.frequencyWater) && input.frequencyWater > 0 && !isNaN(input.amountWater) && input.amountWater > 0) { 
           
            // 2. add the item to the plants controller
            newItem = PlantsController.addPlant(input.name, input.amountWater, input.frequencyWater)

            // 3. add the item to the UI
            UICtrl.addListItem(newItem);

            // 4. clear the fields. 
            UICtrl.clearFields();
            
        }
    };

    return {
        init: function () {
            setupEventListeners();
            UICtrl.displayMonth();
            // Retrieve the object from storage
            var retrievedObject = localStorage.getItem(data);
        },
        
        removePlant: function(id) {
            PlantsController.deletePlant(id);
            UIcontroller.deleteListItem(id);
        },
    };
    
}) (PlantsController, UIcontroller);

Controller.init();
