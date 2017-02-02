
var app = angular.module("defhrApp", []);


app.controller('defhrController',function ($scope) {    
    
    
    var vm = this;
    
    vm.horses={};
    vm.filters = {};
    vm.filters.breed="";
    
    
    Papa.parse("http://defhr.org/horse-data-wrapper.php", {
	download: true,
	header: true,
	complete: function(results) {
		vm.horses=results.data;
        $scope.$apply(); 
        // console.log(vm.horses);
	}
    });
   

    
});


app.directive('page', function() {
   return {
       restrict: 'E',
       link: function(scope, element, attrs) {
           // some code
       },
       templateUrl: function(elem,attrs) {
           return 'pages/'+attrs.name+".html";
       }
   }
});


app.filter('unique', function() {

  return function(items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function(item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function(item) {
        var isDuplicateOrBlank = false;
        //console.log(item+"; "+item[filterOn]+"; "+(item[filterOn]==''))

          
        if (item[filterOn]=="") isDuplicateOrBlank=true;  
          
        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicateOrBlank = true;
            break;
          }
        }
        if (!isDuplicateOrBlank) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
});



app.filter('FilterHorses', function() {

  return function(items,filters) {
    
    var filteredItems=[];  
      
    angular.forEach(items, function(item) {
      
      if (filters.breed=="" || filters.breed==item.breed) filteredItems.push(item);
    });
      
    return filteredItems;
  };
    
});
  