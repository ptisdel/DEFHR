
var app = angular.module("defhrApp", []);


app.controller('defhrController',function ($scope) {    
    
    
    var vm = this;
    
    vm.horses={};
    
    
    Papa.parse("http://defhr.org/horse-data-wrapper.php", {
	download: true,
	header: true,
	complete: function(results) {
		vm.horses=results.data;
        $scope.$apply(); 
        console.log(vm.horses);
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


