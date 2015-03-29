var statham = angular.module('statham', []);

statham.controller('StathamMainCtrl', function($scope, $http) {

	$scope.site = {};
    
	$http.get('https://pathar.tl/wp-json').
		success(function(data, status) {
			$scope.site.info = data;
		});

});