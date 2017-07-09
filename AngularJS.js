
var app = angular.module("defhrApp", []);


app.controller('defhrController',function ($scope) {    
    
    
    var vm = this;
    
    vm.horses={};
    vm.filters = {};
    vm.filters.breed="";
    vm.filters.sex="";
    vm.filters.height="";
    vm.filters.age="";
    vm.filters.post_name="";
    
    
    Papa.parse("https://defhr.org/horse-data-wrapper.php", {
	download: true,
	header: true,
    skipEmptyLines: true,
	complete: function(results) {
		vm.horses=results.data;
        
        angular.forEach(vm.horses, function(value, key) {
            
            if (value.image!=null){    
                value.image=value.image;
            }
         
            
        });
        
        $scope.$apply(); 
        
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
        
        //sort items alphabetically
        newItems = newItems.sort(function(a, b){
          return a[filterOn] > b[filterOn];
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

      if (
          (filters.breed=="" || filters.breed==null || filters.breed==item.breed) && (filters.sex=="" || filters.sex==null || filters.sex==item.sex) && (filters.height==""  || filters.height==null || filters.height==item.height) && (filters.age=="" || filters.age==null || filters.age==item.age)
          ) 
          filteredItems.push(item);
    });
      
    return filteredItems;
  };
    
});
  