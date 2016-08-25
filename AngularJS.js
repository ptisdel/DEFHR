
var app = angular.module("defhrApp", []);


app.controller('defhrController',function () {    
    
    
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

